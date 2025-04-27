---
media_order: image.png
image_align: left
text_align: justify
---

<div align="center"><h3>
    Our team's scouting system provides valuable information for match strategizing and alliance selection.
    </h3></div>
<br>

##### Motivation
Teams' rankings, Offensive Power Ratings (OPR), and Expected Points Added (EPA) are often not most viable metrics for evaluating quality of performance at competitions. Additionally, they provide no detailed information about robots, and do not offer a qualitative perspective. Our scouting system provides higher accuracy by tracking the actions of every robot in every match, which allow us to make well-informed decisions. Additionally, our team has historically (pre-2016) not given enough attention or analysis to the data we collected. Now, our data is at the forefront of our match strategization and alliance selection. 

[Click here](https://blog.thebluealliance.com/2017/10/05/the-math-behind-opr-an-introduction/) for an explanation of how OPR is calculated and [here](https://blog.thebluealliance.com/2017/11/06/opr-you-basic-frc-strategy/) for an article about the benefits and limitations of OPR. 

[Click here](https://www.statbotics.io/blog/intro) for an explanation of how EPA is calculated and its benefits/limitations.


##### Past Scouting History
Since 2016, our scouts have recorded their observations on paper scouting sheets, and in 2018 we used an internally-developed app for the Kindle. Quantitative data was given to the data analyst(s) in the form of an excel spreadsheet or .csv file. The data analyst(s) used [Tableau] (https://www.tableau.com/), a versatile data visualization tool, to chart information quickly and effectively.
 
Often with paper scouting, a separate team member specifically entered data into Excel to be given to the data analyst(s). We designed our paper scouting sheets to be user-friendly for both the scouts and data entry person. We accomplished this by making the quantitative scouting sheet answers all numerical and asking scouts to copy their responses to a vertical list at the side of the sheets. The scouting sheets were also organized chronologically and included diagrams of the field. We will be using Bluetooth (as part of the internally developed app) to transfer data from the Kindles directly to a .csv file this year. An example scouting sheet is shown below.

<div align="center"><img src="/images/scoutingSheet2017.png"></div>

With Tableau, the data analyst(s) and match strategist(s) prepares the drive team with knowledge about the strengths and weaknesses of our own alliance and our opposing alliances. We also use the data we collect to see which teams would make for good alliance members. An example chart for the 2018 game FIRST Power UP is shown below with anonymized team numbers. Teams that could not consistently score on the scale (e.g. team 35 in the chart) may opt to pick a team that focuses on the scale to complement their strengths, like team 22 or 24.

![](/user/images/websiteExampleGraph.jpg)

##### Scouting Procedure
Earlier in the season, we partnered with FRC 1727 REX, in a joint scouting alliance. It was a mutually beneficial relationship, REX offered us Pit Scouting data and in return we shared our ShinyApp and data (more on that later). Unfortunately, due to the structure of the FIRST Robotics Competition, this alliance could not sustain itself during the World Championships, and thus we had to come up with a new system. Currently, we assign robots to each of our strategists, and pit scout on qualities such as dimensions, motor type, and robot name.

As for match-by-match scouting, we have six volunteer members of our team scout each robot in a match. These members record actions performed by their robot on iPads, with QRScout installed. QRScout has been very beneficial towards our goal of moving away from internet-dependent scouting and we are able to scan the QR code directly into our Data Entry computer. The Data Entry computer is responsible for containing the most up-to-date data and our Data Entry-ist is responsible for performing preliminary checks on the validity of the data (i.e. not having an alliance score more than 12 coral on a level).

When our strategist needs data, to strategize about our team's next match, the Data Entry-ist copies a .csv file with the newest data into a USB drive. Then, the strategist plugs in the USB drive and copies over the most recent data.

This year, one of our main priorities has been to create a **positive scouting culture**, where students are eager and willing to scout. We have reaped the benefits of our goal, as we were able to switch from schedule-dependent forced scouting, to volunteers! To facilitate such a change we developed a ShinyApp in RStudio this year, which displays data collected in a meaningful, visual way. 



##### Influence
In the spirit of Gracious Professionalism, we provide our Tableau charts to the public at every competition we go to so that teams without their own scouting systems may be more informed about teams' performances. Our scouting system is recognized by most all of the Chesapeake District and adapted by a number of other teams. 

Our scouting system has led us to great success in competitions as well. In the 2017 Chesapeake District Championships event, our team was ranked 52nd out of 58 teams, and yet was chosen 12th in the elimination rounds because we showed top-ranking teams about our real capabilities and made it to the 3rd round of grand finals, where one alliance member disconnected and our robot got stuck on a gear. As an alliance captain at girlPOWER in 2018, we chose the 13th and 14th ranked teams (out of 14 teams) due to the results we saw in our data, and went on to win the event.