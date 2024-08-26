
<p align="center">
   <img src="public/icons/logo.svg" alt="ChatSphere"/>
</p>
<h1 align="center">ChatSphere</h1>

ChatSphere is an innovative AI-powered search engine designed to revolutionize the way users interact with information. Unlike traditional search engines, ChatSphere integrates multiple Large Language Models (LLMs), providing users with the flexibility to choose the AI that best suits their needs for any given query. 

This repository is for the web version of ChatSphere, which plans to use IndexedDB as the database. Additionally, all primary colors are defined in the Tailwind configuration file to maintain design consistency.

**Key Features**:

- **Multiple AI Models**: ChatSphere offers access to a variety of LLMs, each with unique strengths. Whether users need concise answers, detailed explanations, or creative ideas, they can select the model that fits their specific requirements.
  
- **User-Centric Interface**: The search engine is built with a focus on simplicity and usability. The clean and intuitive design ensures that users can easily navigate through options and find the information they need with minimal effort.
  
- **Contextual Understanding**: Leveraging advanced AI capabilities, ChatSphere delivers results that are contextually relevant, helping users get more accurate and useful information quickly.
  
- **Scalable and Extensible**: The architecture of ChatSphere is designed to scale with the evolving needs of users, allowing for easy integration of additional LLMs and other AI tools in the future.

**Vision**:<br> ChatSphere is not just another search engine; it represents a new paradigm in information retrieval. By putting the power of choice in the hands of users, [VedaVerse](https://vedaverse.io) aims to create a personalized search experience that adapts to diverse needs and preferences.

<p align="center">
   <img src="https://i.ibb.co/QvwXDzW/Mac-Book-Air-3.png" alt="Home" border="0" width="600"><br>
   <img src="https://i.ibb.co/9tmP2gV/Mac-Book-Air-1-1.png" alt="Chat" border="0" width="300">
   <img src="https://i.ibb.co/9WW7nh3/Mac-Book-Air-2-1.png" alt="Artifact" border="0" width="300">
</p>

## Documentation and Guidelines

### Setup and Installation

1. **Prerequisites**: Make sure the following tools are installed on your system:

   - [Git](https://git-scm.com/downloads)
   - [Node.js](https://nodejs.org/en)
   - A text editor of your choice (e.g., [VS Code](https://code.visualstudio.com/))

   Expand a section based on the OS you are using:

   <details>
   <summary>Windows</summary>

   Download the setup executables from the above links and install the programs, keeping everything default.

   `NOTE - Make sure to update your PATH`

   Verify your installation by running the following commands:

   ```
   node --version
   git --version
   ```

   You should see an output similar to:

   <img src="https://raw.githubusercontent.com/sumirx/leaderboard/master/images/versions.png" />

   Next, download [Visual Studio Code](https://code.visualstudio.com/) or any other text editor of your choice, and install it by following the steps in the setup wizard.

   </details>

   <details>
   <summary>Mac</summary>

   Install HomeBrew:

   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

   Run the following commands to install Git and Node.js:

   ```
   brew install git
   brew install node
   ```

   Verify your installation by running:

   ```
   node --version
   git --version
   ```

   You should see an output similar to:

   <img src="https://raw.githubusercontent.com/sumirx/leaderboard/master/images/versions-mac.jpg" />

   Next, download [Visual Studio Code](https://code.visualstudio.com/). After downloading, open the zip file to automatically extract the application, then drag it to the Applications folder to install.

   </details>

   <details>
   <summary>Linux</summary>

   Run the following commands to install Git and Node.js on Ubuntu:

   ```
   sudo apt install git
   sudo apt install nodejs
   ```

   `NOTE - Use the correct package manager for your Linux Distro`

   Verify your installation by running:

   ```
   node --version
   git --version
   ```

   You should see an output similar to:

   <img src="https://raw.githubusercontent.com/sumirx/leaderboard/master/images/versions-linux.png" />

   Finally, install VS Code on Ubuntu:

   ```
   sudo snap install code --classic
   ```

   `Refer to your distro's installation guide to find the correct install command`

   </details>

2. **GitHub Setup**: Create a [GitHub](https://github.com/) account if you don't already have one.

3. **Git Configuration**: Configure Git on your system with the following commands:

   ```
   git config --global user.name "Your Name"
   git config --global user.email "youremail@email.com"
   ```

   `The email you enter should match the one used to create your GitHub account`

4. **SSH Key Setup**: Add an SSH key to your GitHub account by following [this guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

5. **Fork the Repository**: Fork the ChatSphere repository on GitHub.

   <img src="https://raw.githubusercontent.com/sumirx/leaderboard/master/images/fork.png" />

6. **Clone the Repository**: Clone your forked repository with this command:

   ```
   git clone git@github.com:<your-username>/ChatSphere.git
   ```

   `Replace <your-username> with your GitHub username`

7. **Open the Repository**: Open the cloned repository in your preferred text editor/IDE.

8. **Install Dependencies**: Run the following command in the project's root directory to install the required dependencies:

   ```
   npm install
   ```

9. **Environment Setup**: Navigate to the [GROQ API Reference](https://console.groq.com/keys), log in, and create a new API key. Copy the key, create a `.env.local` file in the root folder of the project, and add the following:

   ```
   NEXT_PUBLIC_GROQ_API_KEY=Your_API_Key
   ```

10. **Start the Development Server**: Now that the dependencies are installed, start the Next.js development server:

    ```
    npm run dev
    ```

    Navigate to http://localhost:3000 to view the output.

**Hurray!! You are now ready to contribute to the project.**

### How to Contribute

`Skip steps 1 - 4 if you followed all the steps from Setup and Installation`

1. **Fork the Repository**: Fork the ChatSphere repository to your GitHub account.

2. **Clone the Repository**: Clone your forked repository to your local system.

3. **Install Dependencies**: Run `npm install` in the root directory of the cloned repository.

4. **Make Changes**: Implement your changes to the project.

5. **Commit Your Changes**: Use the following commands to commit your changes:

   ```
   git add .
   git commit -m "A useful commit message"
   ```

6. **Push Your Changes**: Push your commits to your GitHub repository:

   ```
   git push -u origin master
   ```

7. **Create a Pull Request**: Submit a Pull Request (PR) from your forked repository.

**That's it!** Your PR will be reviewed by a team member, and based on the code quality, it may be requested for changes or eventually merged!

### Design Guidelines

This project follows a specific design that needs to be implemented in the UI. You can view the design on [Figma](https://www.figma.com/design/6x6jrOQgfMoWWENXD9NFF0/ChatSphere?node-id=0-1&t=mNiBIXIcFv7HStX0-1).

### Guidelines for Contributions

This guide will help you follow best practices while writing code, ensuring consistency and readability across the project.

#### Code Formatting

Proper code formatting is essential for maintaining consistency and readability in the project.

A helpful tool for code formatting is [Prettier](https://prettier.io/). You can install it from the `Extensions` tab in VS Code:

<p align="center">
   <img src="https://raw.githubusercontent.com/sumirx/leaderboard/master/images/prettier.png" >
</p>

Locate the `.prettierrc` file in the repository. This file contains the necessary configurations for code formatting in this project.

With Prettier installed, formatting your code is as simple as saving the file—Prettier will automatically format the code upon each save.

You can refer to the following resources for more guidelines on writing clean and efficient code:

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide)
- [FreeCodeCamp's Clean Code Guide](https://www.freecodecamp.org/news/how-to-write-clean-code/)
- [GeeksForGeeks' Guide](https://www.geeksforgeeks.org/coding-standards-and-guidelines/)

Happy Learning!

