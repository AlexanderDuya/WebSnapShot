# Full-Page Screenshot Capture with Puppeteer

This project allows users to take full-page screenshots of websites using Puppeteer, a Node.js library. It automatically scrolls through the page to trigger animations before capturing the screenshot.

## Features

- Captures full-page screenshots, including scroll-triggered animations.
- Automatically generates unique filenames using timestamps and random numbers.
- Supports both `http` and `https` URLs.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or later)
- [npm](https://www.npmjs.com/get-npm) (Node Package Manager)

## Installation

1. Clone the repository or download the source code.

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory.

    ```bash
    cd path/to/project/directory
    ```

3. Install the required dependencies.

    ```bash
    npm install puppeteer
    ```

## Usage

1. Open your terminal or command prompt.

2. Navigate to the directory where your script is located.

    ```bash
    cd path/to/your/script
    ```

3. Run the script.

    ```bash
    node full_page_screenshot.js
    ```

4. When prompted, enter the URL of the website you want to capture.

    ```plaintext
    Please enter the URL of the website: https://example.com / if you enter without https it may not work but for added security you may type things such as adclear.ai and it will work.
    ```

5. The script will scroll through the page and take a screenshot. The screenshot will be saved in the same directory with a unique filename, such as `screenshot_2024-09-27_1234.png`.

## Example

To capture a screenshot of `https://example.com`, simply enter the URL when prompted:

```plaintext
Please enter the URL of the website: https://example.com
