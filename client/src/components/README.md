# High Level Description of Files in the components folder

## bot.jsx

This file contains the code for the bot component used in the test version of the tutor (coding questions only and not the MCQ Questions). This is the child of the tutor page

## botMCQ.jsx

Bot component in MCQ page occupies a larger height and width and hence is in a different file. Working is the same. It is also present on the right hand side of the page. This is a child of the tutor MCQ page. 

## botMessage.jsx

This file is the component for the bot message. Every time Open AI sends a message, we pass the message to this component and render it on screen. This is a child of the bot component. 

## userMessage.jsx

This file is the component for the user message. Every time the user sends a message, we pass the message to this component and render it on screen. This is a child of the bot component. 

## codeDisplay.jsx

The code editor component, that displays the code as fill in the blanks. This is the child of the Editor component.

## codeDisplayMCQ.jsx

This file is the component for the code editor in the MCQ page. The code is rendered below the Problem Statement. This is a child of the tutor page.

## controlOutput.jsx

This is the reveal answers panel in the control version of the tutor. It appears where the bot appears in the test version of the tutor. It is a child of the tutor-control page

## controlOutputMCQ.jsx

This is the reveal answers panel in the control version of the mcq tutor. It appears where on the right hand of the screen. It is a child of the tutor-control-Mcq page. 

## editor.jsx

This is the editor - parent component of the code editor. It contains code for calling chatgpt and checking user answers. It is the child of the tutor page

## header.jsx

This is the header that shows the topic name, module name and the problem number. It is a child of the tutor page. 

## introBlock.jsx

The intro block on the dashboard, which introduces the Java Tutor. It is a child of the dashboard page. 

## loginPanel.jsx

This is the login panel for the tutor and handles login for students. It is the child of the login page. 

## mcqQuestion.jsx

This is the mcq question component in the tutor page. It is a child of the tutor-mcq page.

## mcqQuestionControl.jsx

The MCQOptions Control component present in the control version of the tutor mcq page. It is a child of the tutor-mcq-control page.

## moduleName.jsx

Displays the module name. It is a child of the dashboard page

## name.jsx

Displays the student name on the dashboard. It is a child of the dashboard page.

## output.jsx

Displays the output from the java code execution. It is a child of the tutor page.

## problem.jsx

Displays the problem statement. It is a child of the tutor page.

## problemMCQ.jsx

This is a component for showing the problem statement on the MCQ page. It is a child of the tutor-mcq page.

## questionButton.jsx

This is the question button component. It is a child of the dashboard page. 

## sidePanel.jsx

This is the Side panel component. Currently for Java, but can be reused if tutor is expanded to include other languages. It is a child of the Dashboard page.

## testButton.jsx

These are the Pre-test and Post-test buttons. It is a child of the dashboard page.





