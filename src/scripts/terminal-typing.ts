import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const terminal = document.querySelector('.terminal-output') as HTMLElement
const cursor = document.querySelector('.terminal-cursor') as HTMLElement

if (terminal) {
  const jsonText = `{
  "titulo": "10 Estratégias de Marketing Digital",
  "idioma": "pt-BR",
  "seo": { "score": 98 },
  "imagens": 4,
  "status": "publicado ✓"
}`

  let hasPlayed = false

  function typeText() {
    if (hasPlayed) return
    hasPlayed = true

    let index = 0
    terminal.textContent = ''

    function typeChar() {
      if (index < jsonText.length) {
        terminal.textContent += jsonText[index]
        index++
        setTimeout(typeChar, 30)
      }
    }

    typeChar()
  }

  ScrollTrigger.create({
    trigger: terminal.closest('.project-featured') || terminal,
    start: 'top 75%',
    once: true,
    onEnter: typeText,
  })
}
