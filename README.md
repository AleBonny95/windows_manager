# windows_manager
- WHAT IS

Windows_manager is a window management module written in Typescript using REACT.
This module has been designed to have a simple API able to reproduce a familiar desktop-like environment in a web application, with taskbar containing the buttons of its windows.
Each window can be resized manually from three points: from the right side, from the bottom side and from the bottom right corner.
Each window can have three buttons on its header.
One has the function of reducing the window to icon.
Alternatively, you can reduce an icon window by clicking on the taskbar button.
The window button on the taskbar has different behaviors.
First, it attaches the focus to the window, otherwise if the window already has the focus it reduces it to an icon.
If instead the window is reduced to icon, with the click on the button it is brought back to the last known dimensions.
The second button on the header of a window, has the function of maximizing it in fullscreen or return it to its original size.
The third button can close the window, thus also removing the button from the taskbar.
All these behaviors and related buttons can be enabled or disabled when creating windows.

- INSTALLATION

1. npm install windows_manager / yarn add windows_manager
2. Import Finder component, INode and HeaderBehavior interfaces and use they in your app.

- USAGE

1. Create a HeaderBehavior element in which you can define if the window is:
 - closable,
 - minimizable,
 - draggable,
 - and it can go to full screen.

2. Create an array of INode elements (representing the windows to be managed) and pass the HeaderBehavior element to the INode elements (each window can have a different HeaderBehavior element) by the hProps field.

3. Pass the array of INode elements to the Finder component by the "nodes" property.

- ADVANCED USAGE

1. Create a HeaderBehavior element in which you can define if the window is closable, minimizable, draggable and if the window can go to full screen.

2. Create a function that has a Finder element as a parameter in which you define the windows to add to the Finder component.

3. In the function, create an INode element (with its own HeaderBehavior) and add it to the Finder parameter with the "add(*INode element*)" method.

4. Create a Finder component and pass the function to it by the "onMounted" property.

Note: in an INode element you must define: a ReactNode as window content, window title, if the window is resizable and initial position.

- PERSONALIZATION

Import the Header component and use it to fully define the header style of each window and pass it every single custom button.
Pass it later to the INode element by the property "header".