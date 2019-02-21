---
title: About
media_order: 'rousFun.jpg, tableau.JPG'
image_align: left
menu: About
---

[//]: # (Borrowed from https://stackoverflow.com/questions/35077507/how-to-right-align-and-justify-align-in-markdown)
<script>
document.body.style.display = "none"; // Hide the page until it's finished rendering.

document.createElement("markdown");
var md_tags = document.getElementsByTagName("markdown"); // Returns array of all markdown tags.

for (var i = 0; i < md_tags.length; i++) { // Iterate through all the tags, and generate the HTML.
    var md_text = md_tags[i].textContent.replace(/^[^\S\n]+/mg, ""); // I love regex, so shoot me.

    var md_div = document.createElement("div"); // Make a new div to replace the fake tag.
    md_div.id = "content";
    md_div.innerHTML = marked(md_text);

    md_tags[i].parentNode.appendChild(md_div); // Add remove the old raw markdown.
    md_tags[i].parentNode.removeChild(md_tags[i]);
}

document.body.style.display = ""; // Show the rendered page.
</script>
[//]: # (The stuff above this isn't actually being used atm but I want to keep it somewhere in case)

## **About Our Team**

#### Mission
> Our mission is to expose students to complex problems in a collaborative environment in order to promote personal and intellectual growth while building and competing annually with a well-designed and fabricated robot. Through our activities, we encourage youth to pursue degrees and careers in STEM.

<p style="text-align:justify">
Composed of students and alumni from Montgomery Blair High School and the surrounding area, our team 
has been continually expanding, innovating, and attracting new members since its establishment in 1999. 
<a href="../../about-us">Click here</a> to find out more about our team.
</p>
    
#### What is FIRST?
> The mission of FIRST® is to inspire young people to be science and technology 
> leaders and innovators, by engaging them in exciting mentor-based programs that build 
> science, engineering, and technology skills, that inspire innovation, and that foster 
> well-rounded life capabilities including self-confidence, communication, and leadership

>\- [FIRST website](https://www.firstinspires.org)

<p style="text-align:justify">
FIRST (For Inspiration and Recognition of Science and Technology), founded in 1989, accomplishes its mission through creative events and competitions. The FIRST Robotics Competition (FRC) that our team participates in is the highest echelon of FIRST events which combines the excitement of sport with the rigors of science and technology. Teams of high school students design, fabricate, and program robots for friendly competition. There are currently more than 75,000 high school students on more than 3,000 FRC teams from every state in the US and 24 other countries.
 </p>

[//]: # ([Find out more...](https://getgrav.org?classes=btn,btn-primary,btn-lg))
