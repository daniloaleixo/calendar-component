

# Avanade Angular Academy by Gama

A contest to test Angular skills, the challenge here is to create a calendar component as shown above.

![style-guide-2](https://raw.githubusercontent.com/gamaacademy/gama-avanade-tryout02/master/images/readme-image-1.jpg)

To access: https://daniloaleixo.github.io/calendar-component/


## System architecture

The calendar component was thought to be a component that is going to be used throughout the code, so it's located inside Shared modules (that is a module that will be imported in all modules of the system, holding models, constants, etc).


/shared

&nbsp;&nbsp;/components

&nbsp;&nbsp;&nbsp;&nbsp;/calendar-component



### Sass architecture

The architecture in CSS is following the 7-to-1 pattern and everything that is exclusive to the component are inside its own scss file (to keep it await from the global CSS).

**Component CSS**

With its exclusive classes (which are not visible to the rest of the code)


/shared

&nbsp;&nbsp;/components

&nbsp;&nbsp;&nbsp;&nbsp;/calendar-component

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/calendar-component.scss


&#13;
&#13;


**Global CSS**&#13;

Everything that will be used throught the code&#13;

&#13;
/assets&#13;

&nbsp;&nbsp;/scss&#13;

&nbsp;&nbsp;&nbsp;&nbsp;/base&#13;

&nbsp;&nbsp;&nbsp;&nbsp;/components&#13;

&nbsp;&nbsp;&nbsp;&nbsp;/layout&#13;

&nbsp;&nbsp;&nbsp;&nbsp;/themes&#13;

&nbsp;&nbsp;&nbsp;&nbsp;/utils&#13;

&nbsp;&nbsp;&nbsp;&nbsp;/vendors&#13;



## Original Contest repo
https://github.com/gamaacademy/gama-avanade-tryout02
