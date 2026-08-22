import os
import yaml
import json


def parse_front_matter(file_path):
    print(file_path)
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    if lines[0].strip() != "---":
        return {}

    front_matter_lines = []
    for line in lines[1:]:
        if line.strip() == "---":
            break
        front_matter_lines.append(line)

    front_matter_str = "".join(front_matter_lines)
    try:
        data = yaml.safe_load(front_matter_str) or {}
    except yaml.YAMLError as e:
        print(f"YAML error in file {file_path}: {e}")
        return {}
    else:
        if not data["tags"]:
            data["tags"] = []
        data["tags"] = sorted(data["tags"])
        return data


def traverse_and_parse(root_folder):
    result = {}

    for dirpath, _, filenames in os.walk(root_folder):
        if not dirpath.startswith("vault/.trash"):
            for filename in filenames:
                if filename.endswith(".md"):
                    full_path = os.path.join(dirpath, filename)
                    relative_path = (
                        "/"
                        + os.path.relpath(full_path, root_folder).replace(
                            "\\", "/"
                        )[:-3]
                    )  # normalize path
                    front_matter = parse_front_matter(full_path)
                    if not front_matter["hide"]:
                        result[relative_path] = front_matter

    return result


root = "vault"
data = traverse_and_parse(root)

# print or save the result
with open("build.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, default=str)
