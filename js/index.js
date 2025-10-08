document.addEventListener("DOMContentLoaded", function () {
  /* Footer */

  const footer = document.createElement("footer")
  document.body.appendChild(footer)

  const today = new Date()
  const thisYear = today.getFullYear()

  const copyright = document.createElement("p")
  copyright.innerHTML = `\u00A9 Tetiana Pavlova ${thisYear}`

  footer.appendChild(copyright)

  /*Skills*/

  const skills = ["HTML", "CSS", "JavaScript", "GitHub"]
  const skillsSection = document.querySelector("#Skills")
  const skillsList = skillsSection.querySelector("ul")

  for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li")
    skill.innerText = skills[i]
    skillsList.appendChild(skill)
  }

  /* Messages */

  const messageForm = document.forms["leave_message"]

  messageForm.addEventListener("submit", function (event) {
    event.preventDefault()

    const usersName = event.target.usersName.value
    const usersEmail = event.target.usersEmail.value
    const usersMessage = event.target.usersMessage.value

    console.log(usersName, usersEmail, usersMessage)

    const messageSection = document.querySelector("#Messages")
    const messageList = messageSection.querySelector("ul")

    const newMessage = document.createElement("li")
    newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a> <span>${usersMessage}</span>`

    // Edit button

    const editButton = document.createElement("button")
    editButton.type = "button"
    editButton.innerText = "edit"
    editButton.className = "edit-button"

    editButton.addEventListener("click", function () {
      const messageSpan = newMessage.querySelector("span")
      const updatedText = prompt("Edit your message:", messageSpan.innerText)
      if (updatedText !== null) {
        messageSpan.innerText = updatedText
      }
    })

    // Remove button
    const removeButton = document.createElement("button")
    removeButton.type = "button"
    removeButton.innerText = "remove"
    removeButton.className = "remove-button"

    removeButton.addEventListener("click", function () {
      const entry = removeButton.closest("li")
      entry.remove()
    })

    // Create button container (for vertical layout)
    const messageButtons = document.createElement("div")
    messageButtons.className = "message-buttons"
    messageButtons.appendChild(editButton)
    messageButtons.appendChild(removeButton)

    // Append buttons
    newMessage.appendChild(messageButtons)
    messageList.appendChild(newMessage)

    messageForm.reset()
  })

  // PROJECT SECTION

  fetch("https://api.github.com/users/TetianaPav/repos")
    .then((response) => {
      // Error fetching data
      if (!response.ok) {
        // Throw an error
        throw new Error(
          "Failed to fetch data from GitHub. Please try again later"
        )
      }
      // Return the response
      return response.json()
    })

    .then((repositories) => {
      console.log("GitHub Repositories:", repositories)
      // Get the Project section
      const projectSection = document.getElementById("Projects")
      // Select the list within the Projects section
      const projectList = projectSection.querySelector("ul")
      // Clear the content just in case
      projectList.innerHTML = ""

      // Iterate through all the public repositories
      for (let i = 0; i < repositories.length; i++) {
        // Filter out forked repository
        if (!repositories[i].fork) {
          // Create a new list item
          const project = document.createElement("li")
          // Create a link for the list item
          const link = document.createElement("a")
          // Set the link url
          link.href = repositories[i].html_url
          // Set the text for the link
          link.textContent = repositories[i].name
          // Append the link to the list item
          project.appendChild(link)
          // Append the list item to the list of projects
          projectList.appendChild(project)
        }
      }
    })

    .catch((error) => {
      // Log the error
      console.error("Error fetching repositories:", error)
      // Get the projects section
      const projectSection = document.getElementById("Projects")
      // Add an error message on the UI
      const errorMessage = document.createElement("p")
      errorMessage.innerHTML =
        "Unable to load Projects. Please try again later."
      projectSection.appendChild(errorMessage)
    })
})
