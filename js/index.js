document.addEventListener("DOMContentLoaded", function () {
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
})
