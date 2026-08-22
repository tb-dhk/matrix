---
title: how does melbourne's metro work?
date: 2026-08-22
tags:
  - transit
  - metro
number: 0
hide: false
description: a deep dive into victoria's passenger rail network
---
as you can probably guess from the title and description, the title is a slight misnomer. i have recently been studying melbourne's metro system, but i quickly realised most maps of the melbourne metro also tend to include victoria's regional rail lines as well. this is mainly because melbourne has 5.4 million people, which is about 77% of victoria's total population (7.1 million), which makes victoria australia's most centralised state. melbourne's passenger rail network is thus also victoria's passenger rail network.

melbourne is home to many places that are very important to me. not sentimentally, of course - i have lived in singapore for all but slightly less than two years of my life. however, the university of melbourne, where my parents met, had a huge part to play in my conception and early childhood, and so did the many apartments (and one house) my parents lived in together during the late 1990s and early 2000s. while i do not remember much of my life there, i feel like some part of me wants to learn a bit more about the city where i spent some of my most foundational years.

# overview
> [!note] note
> this article will contain some transit terminology that some readers may be unfamiliar with. for convenience's sake, they have been defined in info callout boxes.

victoria's passenger rail network has three (or four) main components, as detailed in the following table:

| name                        | company                | type                       | aim                                               | notes                                                                                                                                     |
| --------------------------- | ---------------------- | -------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [[#metro\|melbourne metro]] | metro trains melbourne | commuter rail / heavy rail | connecting melbourne's suburbs to the city centre | despite its name, this is not a metro for the most part (other than the city loop).                                                       |
| [[#v/line]]                 | v/line corporation     | regional commuter rail     | connecting melbourne to other parts of victoria   | v/line also runs coach services that include connections that do not involve melbourne, but we will not be covering them in this article. |
| [[#suburban rail loop]]     | transitlinx            | automated rapid transit    | interconnectivity between melbourne's suburbs     | under construction; also not an actual loop                                                                                               |

all assets are owned by victrack, a state-owned corporation, and leased to transport victoria, a government department. transport victoria then sub-leases operational rights to the respective companies.

![[network.png|full map of the current victorian train network]]

this article will talk about each network as well as some of the history and infrastructure surrounding it.
# metro
the melbourne metro is mainly commuter rail, although some of the infrastructure near the city centre (the [[#metro tunnel]] and [[#city loop]]) is heavy rail.

> [!info] what are commuter and heavy rail?
> **commuter rail** uses large trains to connect outer suburbs and city centers mostly during peak hours. these tracks are often shared with regional and intercity trains and have many at-grade crossings, which are intersections with roads at ground level.
> 
> **heavy rail** uses fully separated and dedicated urban tracks with high frequency and all-day service to move large crowds within a city. these services do not have any at-grade crossings and are thus able to operate completely independently of other transport networks.
## ownership
the melbourne metro system is owned by transport victoria and metro trains melbourne, which is a private joint venture between three companies:
- MTR corporation (60%) - hong kong's government-owned transport operator and property developer that runs hong kong's MTR as well as metro services in several other countries, including australia
- john holland (20%) - an oceania-based infrastructure, building, and rail transport services company, owned by the china communications transport company, a state-owned engineering and construction firm
- UGL rail (20%) - an australian rail company specialising in building, maintaining and refurbishing diesel locomotives
## lines
the melbourne metro is basically the pinnacle of the hub-and-spoke model. the main hub is the city centre, best represented by the [[#city loop]], which branches out into several trunks from the city centre. each individual line then branches out further from the trunk to reach various different parts of melbourne. due to how the network is centred around a central hub, trains are usually referred to as "inbound" (towards the city centre) or "outbound" (towards the suburbs).

melbourne's metro lines are often referred to as metropolitan lines to differentiate them from regional [[#v/line]] lines. there are a total of 15 main metro lines and three special metro lines, which are usually grouped into six main groups based on how they leave the hub. each line is named after its terminus, with the exception of some lines that have been extended without any renaming, like the pakenham line (<span class="box" style="background-color: #279fd5; color: white">yarra</span> group) that has since been extended to east pakenham.
### city loop lines
the four groups going through the city loop are named after the last station all the lines share before they start branching out. here is some information about each group, with special lines italicised:

| group                                                                                 | eponym (station) | colour    | lines                                      | city loop direction                                      | entry point to city loop                        |
| ------------------------------------------------------------------------------------- | ---------------- | --------- | ------------------------------------------ | -------------------------------------------------------- | ----------------------------------------------- |
| <span class="box" style="background-color: #be1014; color: white">clifton hill</span> | <                | red       | mernda, hurstbridge                        | clockwise                                                | between parliament and flinders street stations |
| <span class="box" style="background-color: #028430; color: white">caulfield</span>    | <                | green     | frankston, *stony point*                   | anticlockwise                                            | ^                                               |
| <span class="box" style="background-color: #153c6b; color: white">burnley</span>      | <                | dark blue | lilydale, belgrave, alamein, glen waverley | anticlockwise on weekday mornings, clockwise otherwise   | ^                                               |
| <span class="box" style="background-color: #ffbe00; color: black">northern</span>     | north melbourne  | yellow    | craigieburn, upfield                       | anticlockwise on weekday afternoons, clockwise otherwise | between southern cross and flagstaff stations   |
### through-running lines
the other two groups can be further split into two subgroups, where lines in one subgroup run through to lines in the other subgroup. here is some information about each line, its subgroups, and how the subgroups run through the city centre, with special lines italicised:

| group                                                                               | colour     | subgroup 1                                                    | subgroup 2           | via                                         |
| ----------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------- | -------------------- | ------------------------------------------- |
| <span class="box" style="background-color: #f178af; color: black">cross-city</span> | pink       | werribee, williamstown, *laverton*                            | sandringham          | flinders street and southern cross stations |
| <span class="box" style="background-color: #279fd5; color: white">yarra</span>      | light blue | sunbury, [[#airport rail\|airport rail (under construction)]] | cranbourne, pakenham | [[#metro tunnel]]                           |

> [!note] note
> the <span class="box" style="background-color: #279fd5; color: white">yarra</span> group does not have an official name, although it was previously referred to as the <span class="box" style="background-color: #279fd5; color: white">dandenong</span> group pre-metro tunnel (see [[#formation of the <span class="box" style="background-color 028430; color white">cross-city</span> and <span class="box" style="background-color 279fd5; color white">dandenong</span> group (2011)|regrouping]]). it is often unofficially referred to as the <span class="box" style="background-color: #279fd5; color: white">yarra</span> group by transit enthusiasts, as well as on wikipedia, so it will be referred to as such throughout this article.
> 
> additionally, the subgroups used here are unofficial and only for the purpose of illustrating how the lines run through to each other.

### special lines
there are three special lines. other than the laverton line, these are usually listed separately from other lines in the network map.

| line                  | colour | route                                                                                                                                                                | notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| stony point           | green  | from frankston station (end of frankston line) to stony point                                                                                                        | it is the only non-electrified line (diesel) and serves as a shuttle service. it is often grouped with the <span class="box" style="background-color: #028430; color: white">caulfield</span> group, and has historically followed the frankston line during [[#regrouping]].                                                                                                                                                                                                                                      |
| flemington racecourse | grey   | runs clockwise from flinders street station to southern cross and north melbourne stations, then further northwest to showgrounds and flemington racecourse stations | it is also referred to as the special event line and used only for special events happening at or near the racecourse, including races and university examinations. unlike the stony point line, it does not share a colour with any group.                                                                                                                                                                                                                                                                        |
| laverton              | pink   | part of the werribee line, but terminates at laverton instead of going to werribee.                                                                                  | it is part of the <span class="box" style="background-color: #f178af; color: black">cross-city</span> group and usually listed with the werribee and williamstown lines, but is poorly documented as its own line mainly due to the fact that it is basically just a service along the werribee line. it mainly exists as a separate line to help commuters easily differentiate between services before 19:00, since services ending at werribee skip stations while services running to laverton make all stops. |
### airport rail
the airport rail is a future metropolitan line, currently under construction. starting from the melbourne airport, it will join the sunbury line at albion station before heading towards the metro tunnel, making it effectively a part of the <span class="box" style="background-color: #279fd5; color: white">yarra</span> group.
## infrastructure
### city loop
the city loop is a loop consisting of five stations in melbourne's city centre. in clockwise order starting from the west, they are:
- southern cross
- flagstaff
- melbourne central
- parliament
- flinders street

all metro and regional lines (other than the stony point metro line) have at least one station on the city loop, and the <span class="box" style="background-color: #be1014; color: white">clifton hill</span>, <span class="box" style="background-color: #028430; color: white">caulfield</span>, <span class="box" style="background-color: #152c6b; color: white">burnley</span> and <span class="box" style="background-color: #ffbe00; color: black">northern</span> groups actually go around the city loop before turning back to their respective termini. notably, they will pass through each station once before leaving the same way they came.

the city loop only consists of four tracks, each assigned to a group. this has led to a lot of congestion since up to four (previously [[#initial groupings|five]]) different lines could be running in one tunnel at the same time. additionally, when the <span class="box" style="background-color: #153c6b; color: white">burnley</span> and <span class="box" style="background-color: #ffbe00; color: black">northern</span> groups' tracks switch directions slightly past noon, all trains on the track have to leave the loop before new trains can start running the other way. there is thus a 20- to 30-minute window around noon (usually from 12:00 to 13:00) where no trains run in the tunnel, and inbound trains terminate at flinders street station or southern cross station through non-loop tracks instead.
### metro tunnel
the metro tunnel is a relatively recent development in melbourne's rail network that essentially allows lines to go through the city, to prevent congestion in the city loop tracks. it now accommodates the cranbourne, pakenham and sunbury lines (the <span class="box" style="background-color: #279fd5; color: white">yarra</span> group). the metro tunnel runs through five stations, two of which are extensions of city loop stations. from north to south, they are:
- arden
- parkville
- state library (extension of melbourne central)
- town hall (extension of flinders street)
- anzac

the metro tunnel initially opened in november of 2025. to allow for a gradual transition, <span class="box" style="background-color: #279fd5; color: white">yarra</span> group services initially only used the metro tunnel at certain times of the day while reverting to their original city loop routes otherwise. in february of 2026, the <span class="box" style="background-color: #279fd5; color: white">yarra</span> group switched fully to the metro tunnel.
## regrouping
there have been two major events that have led to the regrouping of some lines. both of these are related to pulling lines out of the city loop due to congestion.

> [!note] note
> the following section will contain group names and colours that are no longer in use, namely the green <span class="box" style="background-color: #028430; color: white">cross-city</span> group (now pink) and the <span class="box" style="background-color: #279fd5; color: white">dandenong</span> group (now unofficially the <span class="box" style="background-color: #279fd5; color: white">yarra</span> group).

### initial grouping (1985)
when the city loop was fully commissioned in 1985, all metropolitan lines were funneled into the city loop through one of four groups, and they all went around the city loop before returning to their respective termini.

| group                                                                                 | colour    | lines                                                                |
| ------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------- |
| <span class="box" style="background-color: #be1014; color: white">clifton hill</span> | red       | epping (now mernda), hurstbridge                                     |
| <span class="box" style="background-color: #028430; color: white">caulfield</span>    | green     | frankston, pakenham, cranbourne, sandringham, stony point            |
| <span class="box" style="background-color: #152c6b; color: white">burnley</span>      | dark blue | lilydale, belgrave, alamein, glen waverley                           |
| <span class="box" style="background-color: #ffbe00; color: black">northern</span>     | yellow    | werribee, williamstown, sydenham (now sunbury), craigieburn, upfield |
### formation of the <span class="box" style="background-color: #028430; color: white">cross-city</span> and <span class="box" style="background-color: #279fd5; color: white">dandenong</span> group (2011)
in 2011, the frankston line (<span class="box" style="background-color: #028430; color: white">caulfield</span>) was through-run with the werribee and williamstown lines (<span class="box" style="background-color: #ffbe00; color: black">northern</span>), and they were pulled out of their respective groups to form a new <span class="box" style="background-color: #028430; color: white">cross-city</span> group. to relieve congestion in the city loop, these routes would only run through flinders street station and southern cross station and on surface-level tracks separate from the city loop lines. the <span class="box" style="background-color: #028430; color: white">cross-city</span> group also included the sandringham line (<span class="box" style="background-color: #028430; color: white">caulfield</span>), which would not through-run to the weribee and williamstown lines or use the city loop, instead terminating at flinders street. since the stony point line ran as a shuttle service from frankston, it also followed the frankston line to the <span class="box" style="background-color: #028430; color: white">cross-city</span> group.

the <span class="box" style="background-color: #028430; color: white">caulfield</span> group was effectively dissolved, and the <span class="box" style="background-color: #028430; color: white">cross-city</span> group took over the colour green, with the exception of the sandringham line which was coloured pink on maps. the two remaining lines in the <span class="box" style="background-color: #028430; color: white">caulfield</span> group (the pakenham and cranbourne lines) were regrouped as the <span class="box" style="background-color: #279fd5; color: white">dandenong</span> group, named after dandenong station which they diverge from, and they continued to run in the city loop.
### opening of the metro tunnel (2026)
when the metro tunnel was fully opened in 2026, yet another regrouping occurred. the sunbury line (<span class="box" style="background-color: #ffbe00; color: black">northern</span>) was through-run with the pakenham and cranbourne lines (<span class="box" style="background-color: #279fd5; color: white">dandenong</span>) through the metro tunnel, and the <span class="box" style="background-color: #279fd5; color: white">dandenong</span> group was no longer referred to as such. it has since been referred to by many as the <span class="box" style="background-color: #279fd5; color: white">yarra</span> group.

additionally, in the <span class="box" style="background-color: #028430; color: white">cross-city</span> group, the sandringham line took over the frankston line and through-ran to the weribee and williamstown lines. the frankston line was returned to the city loop, and along with the stony point line, it left the <span class="box" style="background-color: #028430; color: white">cross-city</span> group to become the only member of the revived <span class="box" style="background-color: #028430; color: white">caulfield</span> group. meanwhile, the <span class="box" style="background-color: #f178af; color: black">cross-city</span> group was coloured pink, which had been the sandringham line's colour since 2011.

> [!info] what is through-running?
> through-running is when a train continues running past a terminus instead of stopping and reversing direction, continuing onto another service. for example, sunbury line trains coming from the northwest do not terminate in the city centre, but instead continue onto the other <span class="box" style="background-color: #279fd5; color: white">yarra</span> group lines on the southeast (pakenham and cranbourne).
> 
> the melbourne metro system uses through-running to reduce congestion on the city loop. trains on lines that are not through-run have to reverse direction to return to their terminus, meaning they either have to go around the city loop or turn around at flinders street, both of which cause congestion since platform and track space are both limited. trains that are through-run no longer have to go around the whole city loop (the <span class="box" style="background-color: #f178af; color: black">cross-city</span> group) or avoid it entirely (the <span class="box" style="background-color: #279fd5; color: white">yarra</span> group).
### summary table of all changes

| line         | 1985                                                                               | 2011                                                                                | 2026                                                                                |
| ------------ | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| pakenham     | <span class="box" style="background-color: #028430; color: white">caulfield</span> | <span class="box" style="background-color: #279fd5; color: white">dandenong</span>  | <span class="box" style="background-color: #279fd5; color: white">yarra</span>      |
| cranbourne   | ^                                                                                  | ^                                                                                   | ^                                                                                   |
| frankston    | ^                                                                                  | <span class="box" style="background-color: #028430; color: white">cross-city</span> | <span class="box" style="background-color: #028430; color: white">caulfield</span>  |
| stony point  | ^                                                                                  | ^                                                                                   | ^                                                                                   |
| sandringham  | ^                                                                                  | ^                                                                                   | <span class="box" style="background-color: #f178af; color: black">cross-city</span> |
| werribee     | <span class="box" style="background-color: #ffbe00; color: black">northern</span>  | ^                                                                                   | ^                                                                                   |
| williamstown | ^                                                                                  | ^                                                                                   | ^                                                                                   |
| sunbury      | ^                                                                                  | <span class="box" style="background-color: #ffbe00; color: black">northern</span>   | <span class="box" style="background-color: #279fd5; color: white">yarra</span>      |
# v/line
the v/line is victoria's regional rail system, which extends beyond melbourne to other parts of victoria. it is operated by v/line corporation, a statutory authority.

regional lines are either commuter (formerly "interurban") or long-distance (formerly "intercity"), and are all named after their respective termini. they all run from southern cross in five different directions, sharing tracks with at least one metro line (usually acting as an express service along that line). each direction corresponds to one commuter line, and long-distance lines share all stops with the commuter line running in the same direction, but also extend past the commuter line's terminus. notably, the myki ticketing system that is used in the rest of melbourne's public transport is not usable for parts of the long-distance lines further away from melbourne.

here is some information about the regional train lines:

| direction | commuter line | long-distance line  | colour  | corresponding metro line | last station shared with metro line |
| --------- | ------------- | ------------------- | ------ | ------------------------ | ----------------------------------- |
| southwest | geelong       | warrnambool         | purple | sunbury                  | sunshine                            |
| west      | ballarat      | ararat, maryborough | ^      | ^                        | ^                                   |
| north     | bendigo       | echuca, swan hill   | ^      | ^                        | sunbury                             |
| northeast | seymour       | albury, shepparton  | ^      | craigieburn              | <                                   |
| east      | traralgon     | bairnsdale          | ^      | pakenham                 | east pakenham                       |

while v/line trains do pass through some stations on the city loop, they do not use the underground city loop tracks that are reserved for metro trains. instead, they use their own overground tracks.
# suburban rail loop
if you're observant, you've probably noticed one huge flaw with the current hub-and-spoke model: there are no lines connecting the suburbs. the suburban rail loop (SRL) is an automated rapid transit line that aims to fix this by going in an arc around melbourne. while not an actual closed loop, it will serve as a bypass that allows commuters to go to other parts of melbourne without having to go through the city.
## ownership
the suburban rail loop is run by transitlinx, a consortium of several companies:
- john holland (see [[#ownership|metro trains melbourne]])
- RATP dev - a subsidiary of RATP group that provides operations and maintenance of passenger transport services. RATP group is a french state-owned enterprise that operates public transport systems primarily in paris, france
- alstom - a french multinational rail transport systems manufacturer
- KBR - a major american engineering company
- WSP - a canadian multinational engineering consultancy
## network

![[srl.png|map of the suburban rail loop (and airport rail)]]

the suburban rail loop has three main sections:
- SRL east: runs from box hill station to cheltenham station
- SRL north: runs from melbourne airport station to box hill station
- SRL west: runs from werribee station to sunshine station

the [[#airport rail|melbourne airport rail line]] will serve as a link between SRL north and SRL west, since part of its route is from melbourne airport to sunshine.

SRL east is due to finish by 2035, and SRL north is still in the final stages of proposal and set to finish by 2043. at the time of publishing, SRL west does not have any publicly available plans other than the two termini.
# conclusion
this concludes our brief venture into victoria's (although mostly melbourne's) passenger rail network. it's quite evident from not just the numbers but also the design of the network that victoria is incredibly centralised, with all regional lines leading to melbourne, and all regional and metropolitan lines leading to the city centre. as melbourne becomes increasingly crowded and congested, it's nice to see that the victorian government is working on new projects that aim to encourage connectivity outside of the city loop, redirecting people through mini-hubs instead of the main one. hopefully, this will allow for more efficient transit for victorians in the years to come.