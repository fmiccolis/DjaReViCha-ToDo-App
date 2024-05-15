interface Technology {
    name: string,
    type: string,
    users: string,
    website: string,
    frontImage: string,
    backImage: string
}


const reactLogo = "react.svg"
const viteLogo = "vite.svg"
const chakraLogo = "chakra.svg"
const djangoLogo = "djangoproject.png"

const reactLogoPath = `/static/${reactLogo}`
const viteLogoPath = `/static/${viteLogo}`
const chakraLogoPath = `/static/${chakraLogo}`
const djangoLogoPath = `/static/${djangoLogo}`

export const technologies: Technology[] = [
    {
        name: "Django",
        type: "backend",
        users: "76.9K",
        website: "https://djangoproject.com",
        frontImage: djangoLogoPath,
        backImage: "/static/back_django.png"
    },
    {
        name: "React",
        type: "frontend",
        users: "222K",
        website: "https://react.dev",
        frontImage: reactLogoPath,
        backImage: "/static/back_react.jpeg"
    },
    {
        name: "Vite",
        type: "build tool",
        users: "64.9K",
        website: "https://vitejs.dev",
        frontImage: viteLogoPath,
        backImage: "/static/back_vite.png"
    },
    {
        name: "Chakra-ui",
        type: "UI library",
        users: "36.6K",
        website: "https://v2.chakra-ui.com",
        frontImage: chakraLogoPath,
        backImage: "/static/back_chakra.png"
    }
]