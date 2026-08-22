---
title: how i learned hexadecimal
date: 2025-08-16
tags:
  - nerd
  - math
number: 1
hide: true
description: and how you can too!
---
# introduction
i think the first thing most people would ask upon reading the title is
> why would you want to do this to yourself?

which is a great question considering the fact that we all have access to technology like calculators (and websites) that can convert these numbers in an instant. so why would i want to make myself suffer by having my brain do it for me?

well, there's **five main reasons**.
1. i like math and i've always had this fascination with different number systems for some reason.
2. hexadecimal is base 16, and 16 is $2^4$ and $4^2$, which is aesthetically pleasing.
3. i work with computers, which run on binary, so it's generally helpful to have good hexadecimal number sense.
4. the h2 computing written exam requires you to convert ip addresses between hexadecimal, decimal and binary. i can convert between hexadecimal and binary quite easily since one hexadecimal digit is four binary digits, but i can't say the same about converting between either of these and decimal. converting decimal to binary is much more troublesome because of the sheer number of digits and operations needed to be done as well, and it doesn't help that there are only two unique digits that can easily be mixed up, while hexadecimal is much more compact.
5. i probably have undiagnosed autism.

so now that we have the reasons out of the way, you're probably wondering how exactly i'm going to do this. but before we delve into the methodology, let's talk about what exactly we're aiming to do. 

like most people, i grew up learning and thinking in decimal. people don't usually learn to think in other bases, and it usually stops at learning how they work and how to convert in and out of them. but when i talk about learning a new number system, i don't just mean knowing how to write in it and interpret the numbers. i mean **being able to think *in* this new number system, and having the necessary intuition to manipulate numbers with ease**. but of course, "ease" is subjective, and "intuition" is vague. we need a more solid target to aim for.

since the trigger for this whole idea was converting ip addresses, which only have numbers from 0 to 255 (0xFF), i have decided that the **main goal** of this venture is to be able to convert numbers from 0 to 255 (0xFF) between hexadecimal and decimal without much hesitation or thought. but alas, pointing to the pot of gold at the end of the rainbow is nothing compared to the perilous journey to get there.
# the game plan
there are, technically speaking, several ways of working towards the **main goal**.
## brute-force rote memorisation
the first way is brute-force rote memorisation of all the numbers. there is no way in hell i'm going to do rote memorisation for all 256 numbers because i suck at it, and also it goes against the whole idea of learning a new number system, i.e.
> being able to think *in* this new number system, and having the necessary intuition to manipulate numbers with ease.

rote memorisation of all 256 numbers is the literal antithesis of what i am aiming for here, and so i will not be pursuing this method.

> [!note] note
> i do need to clarify that not all rote memorisation is bad - in fact, it is present in the final methodology. but the idea of simply having an internal lookup table for every single number is not only unrealistic, it would also leave no room for actual calculation, which is what helps to nurture and strengthen number sense.
## repeated conversion
another way to achieve this is by repeatedly converting between the bases. this does, to an extent, involve the idea of learning a new number system, but i've chosen not to pursue it because these questions can get quite hard to improve on quickly, so grinding them would probably lead to a lot of frustration, which will lead to burnout, and we all know where that goes. so no, i will not be pursing this either.

instead, i will be building up my number sense from scratch. but before we can design a methodology tailored to number conversion, we need to look at how people usually convert numbers to begin with.
## base conversion
there are two main ways to convert numbers from two bases. i have chosen to dub these *bottom-to-top* and *top-to-bottom*.
### bottom-to-top
this is the most common method found in base conversion algorithms designed for machines. here are the steps to convert a number to base $b$ using this method:
1. divide $n$ by $b$. 
2. you will obtain a quotient $q$ and a remainder $r$. $r$ is your last digit.
3. convert $q$ to base $b$ (i.e. go back to step 1) and put your result in front of $r$.
as you can probably tell, this algorithm is often done recursively.
### top-to-bottom
this is a method that is used more by humans, mainly because our brains are built to compare and not to count. it thus makes sense that our brains find it easier to compare large values to other large values, which is exactly how this method works. here are the steps to convert a number $n$ to base $b$ using this method:
1. find the biggest power $k$ of $b$ that is smaller or equal to $n$ (i.e. the largest $k$ where $b^k \leq n$)
2. divide $n$ by $b^k$ to obtain a quotient $q$ and a remainder $r$. $q$ is your first digit.
	- if it helps, you can think of $q$ as how many of $b^k$ can fit into $n$.
3. convert $r$ to base $b$ and put your result behind $q$.
you might notice that the methodology is very similar, but the first step requires more knowledge of the powers of $k$. the reason why i say this method is used more by humans is because the first step directly requires comparing $n$ to other numbers and finding the closest value (that is also smaller).
### chunks
while this is not applicable to the case of converting between decimal and hexadecimal, you might have already noticed that base conversion for related bases can be simplified by converting in chunks. in this case, "related" bases are a specific type of base where, for two related bases $a$ and $b$, $log_ab \in \mathbb Q$. for example, binary and hexadecimal are related because $log_216 = 4 \in \mathbb Q$.

how converting in chunks usually works is that you can find a number that is a power of both bases. for example, for 4 and 8, this number would be 64. from there, convert in chunks that are the size of this common number. in base 4, these chunks have three digits (since $64 = 4^3$) whereas in base 8, they have two (since $64 = 8^2$). for the case of binary and hexadecimal, each hexadecimal digit is four binary digits since $16 = 2^4$.

note that these chunks have to start from 0, and should **not** be based on the biggest (leftmost) digit of the number being converted.
## the final methodology
since there are only two digits, it's quite reasonable to say that there is no huge difference between the *top-to-bottom* and *bottom-to-top* method, since for the case of multiplying numbers under 256 by 16, **only one division is required**. one division by 16 alone would be able to split the number into the form $16a + b$, where both $a$ and $b$ are integers below 16. in other words, both digits would be found very quickly within one step.

however, i do have to note that my method is still somewhat similar to the *top-to-bottom* method, since it relies on knowing multiples of 10 and 16 and comparing them to the number i am given. i use these multiples as a **reference value**, and the distances between these multiples and the actual number help me to find my final answer. here's what it might look like in my head for converting a decimal number to hexadecimal:
1. find the closest multiple of 16, whether above or below.
2. imagine that multiple in hexadecimal. it should end with a 0.
3. account for the difference between the number i'm trying to convert and the multiple. 
	- for example, if the number is 1 below the multiple, i'll subtract 1 from the number i'm imagining.
and there we go!

the logic is very similar for hexadecimal to decimal conversion, but it's arguably easier because if i already know my multiples of 16 and what each digit represents incredibly well, conversion here is just a simple addition.

with that in mind, here are the different stages of fluency that i need to get past in order to achieve my goal:
1. **learn the digits.** be familiar with what each digit represents. this mainly applies to digits above 9.
	- this is important because to be able to go any further without any hurdles, i need to be able to almost instantly convert single digits.
2. **learn the number sense.** be able to add and subtract single digits in hexadecimal. it's also very helpful to be able to do this in mod 16. 
	- this is helpful in terms of quickly finding the difference between the number and multiples of 16.
3. **learn the multiples of 16.** this gives me periodic and regular reference points.
	- this doesn't actually have to come after step 2, it just feels more right to learn addition first.
# the actual learning
so now let's move on to how i actually intend to do any of this. i'll first explain what i learned in each step, and from there i'll explain my experience learning it.
## learning the digits
of course, i need to start out by **learning the digits**. for the uninitiated, hexadecimal has 16 digits. these comprise of the digits 0-9 we know and love, as well as the letters A-F.

the main hurdle in this case is moving from A1Z26, where each letter corresponds to a number representing its position in the alphabet, to A10Z35, which is just A0Z25 but plus 10.

here's a reference chart to show what i mean:

| letter | A1Z26 | as a digit |
| ------ | ----- | ---------- |
| A      | 1     | 10         |
| B      | 2     | 11         |
| C      | 3     | 12         |
| D      | 4     | 13         |
| E      | 5     | 14         |
| F      | 6     | 15         |

the main hurdle of this part is seeing each letter and instantly thinking of the right number in hexadecimal, and it doesn't help that A is 10 instead of 11 (which makes more sense with A1Z26). for this, it helps to have a script that forces you to convert back and forth as much as possible. for all stages, a general guideline for judging whether you are ready to move on to the next stage is when you are able to answer 1 or more question per second. personally, what i did was make a mini script for this purpose, using it to practice until i got 64 right in one minute.
## number sense and basic operations
this step is a bit more complicated. after all, it requires us to go into how people process adding and subtracting mentally.

> [!note] note
> to learn how to do quick conversion, you can skip anything that involves addition and *x-pairs*. only subtraction helps in conversion in certain cases.

we'll also need to define some terms.
- the *modular additive inverse* (better known as the *complement*) of a number $n$ is the number that needs to be added to $n$ to form 0 in mod $b$.
	- in other words, $-n \mod b$
- an *x-pair* is a pair of numbers $m$ and $n$ that differ by $x$ where $x$ is half of the base $b$.
	- $m + x \equiv n \mod b$
	- $n + x \equiv m \mod b$

before we explain this in hexadecimal, it might help to recall how we add and subtract mentally in decimal (i.e. b = 10). here's an overview of how addition usually works:
- if we're adding two numbers below 5, you know the sum of these two numbers will be below 10, and there's no need to add a new digit. this is usually a more basic form of addition that you might be expected to know instinctively.
- if we're adding two numbers above 5, you can remove 5 from each of the numbers, then add these 2 numbers together. from there, you can add 10 back.
	- this requires knowledge of each number's *5-pair*.
- if only one of these is above 5, there are two ways you can deal with this:
	- you can remove 5 from the bigger number, add the two numbers together, then add 5 back.
		- this requires knowledge of the bigger number's *5-pair*.
		- for example, $7 + 4 = (5 + 2) + 4 = 6 + 5 = 11$
	- alternatively, if you know the sum exceeds 10, you can split apart the smaller number such that one of the parts formed combines with the bigger number to form 10. from there, you can add the other part of the smaller number.
		- this requires knowledge of the bigger number's *complement*.
		- for example, $7 + 4 = (10 - 3) + (3 + 1) = 10 + 1 = 11$

subtraction is a bit simpler.
- if the first number is bigger than the smaller number, you should know instinctively.
	- since it is guaranteed that none of the numbers exceed 10, there is no need to use *5-pairs* and/or *complement*.
- if the first number is smaller than the second number, you should swap the two numbers, subtract, then find the *complement* of the solution.
	- if you are not using mod, swap the two numbers, subtract, then add a negative sign in front.

doing the same in hexadecimal is quite similar! but instead of 10, use 16, and instead of *5-pairs*, use *8-pairs*. here's a summary table:

| operation   | first number | second number | method                                                                                                  | requirements             |
| ----------- | ------------ | ------------- | ------------------------------------------------------------------------------------------------------- | ------------------------ |
| addition    | < 8          | < 8           | instinctive                                                                                             | none                     |
| addition    | < 8          | = 8           | 8-pair                                                                                                  | 8-pair                   |
| addition    | < 8          | > 8           | remove 8 from the second number to treat it like the first case, then add 8 back<br>                    | 8-pair                   |
| addition    | < 8          | > 8           | form 16 with the second number and part of the first number, then add the rest of the first number back | modular additive inverse |
| addition    | > 8          | = 8           | 8-pair + 0x10                                                                                           | 8-pair                   |
| addition    | > 8          | > 8           | remove 8 from both numbers to treat it like the first case, then add 0x10 back                          | 8-pair                   |
| subtraction | bigger       | smaller       | instinctive                                                                                             | none                     |
| subtraction | smaller      | bigger        | swap two numbers, find modular additive inverse                                                         | modular additive inverse |

you don't exactly need to memorise this table, although it might be a good reference for you to figure out how to optimise your calculations.

from the table above, it is quite evident that both *8-pair* and *complement* are important for gaining a good number sense. similarly to learning the digits, it is generally a good idea to keep converting back and forth until you can answer more than 1 question per second.

here are the *8-pairs* and *complements* for numbers 0 to 8.

| number (< 8) | 8-pair | modular additive inverse |
| ------------ | ------ | ------------------------ |
| 0            | 8      | 0                        |
| 1            | 9      | F                        |
| 2            | A      | E                        |
| 3            | B      | D                        |
| 4            | C      | C                        |
| 5            | D      | B                        |
| 6            | E      | A                        |
| 7            | F      | 9                        |
| 8            | 0      | 8                        |

after learning the digits properly, learning these should become trivial.
### a small hurdle
this step took a lot longer for me mainly because i was still a bit rusty on the digits. as much as i knew how to convert them back and forth on demand, it was a bit harder for those facts to come to me intuitively. in my mind, D corresponded to 13, but i hadn't been able to fully internalise that D was *equal* to 13. however, i will say that this portion of learning is meant to feel that way.

at some point in going back and forth from directly converting the numbers from base to base, most people hit a plateau because this conversion only really builds an idea of numbers corresponding to each other. the only real way to learn intuition in using numbers is by... well, you guessed it, **using the damn numbers**. this step actually improved my intuition for these numbers by quite a lot, and it took me further than the last step alone would have taken me.
## learn the multiples of 16
as previously stated, the multiples of 16 are usually a good reference point during conversion. when converting dec to hex, it helps to identify the nearest multiple of 16 and then offset from there. when converting hex to dec, it helps to find the corresponding multiple of 16 for the first digit before adding the second one.

| $n$ | $16n$ |
| --- | ----- |
| 0   | 0     |
| 1   | 16    |
| 2   | 32    |
| 3   | 48    |
| 4   | 64    |
| 5   | 80    |
| 6   | 96    |
| 7   | 112   |
| 8   | 128   |
| 9   | 144   |
| A   | 160   |
| B   | 176   |
| C   | 192   |
| D   | 208   |
| E   | 224   |
| F   | 240   |

it can also help to find some of these values by adding 0x50 (80) to the numbers, which only changes the tens digit and up in decimal. 

to practice this, you can use [00001h (maf)'s website](https://00001h.github.io/hexp/) which has a mode just for multiples of 16 (if you press F4). note that this website only tests conversion to decimal.

for this, i only managed to hit around 1.05 seconds for each conversion and plateaued there for a very long time.
## continue grinding
after you're confident with multiples of 16, feel free to move on to greener pastures (and by that, i mean other numbers). [00001h (maf)'s website](https://00001h.github.io/hexp/) can be used to practice conversion of any 2-digit decimal number to hexadecimal. for me, i was satisfied enough after i was able to convert decimal to hexadecimal and back within seconds, and that was how i decided to end my journey.
# conclusion
number sense is something we all really take for granted. as children, we all learn how to count in base 10, and as we grow up, we slowly learn to add and subtract, multiply and divide, and later even exponentiate. from learning all of these skills over the span of a decade, we develop an intuition for what different numbers represent and how they feel, and it becomes an integral part of how we calculate and process numbers, even if we're not actively trying to do arithmetic. this experience has really helped me to understand the importance of number sense in how we as humans count, and it's one of the many underappreciated little things in life that we should all be more grateful for.