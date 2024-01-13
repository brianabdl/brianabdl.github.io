import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faInstagram, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";

export const dictSocialMedia = [
    {
        name: 'Instagram',
        link: 'https://www.instagram.com/brianabdl/',
        icon: faInstagram
    },
    {
        name: 'Twitter',
        link: 'https://www.twitter.com/brianabdl/',
        icon: faTwitter
    },
    {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/muhammad-brian-abdillah-57b872242/',
        icon: faLinkedin
    },
    {
        name: 'Github',
        link: 'https://github.com/brianabdl/',
        icon: faGithub
    },
    {
        name: 'Email',
        link: 'mailto:mohammadbrianabdillah@gmail.com',
        icon: faEnvelope
    }
]

export const SocialMedia = (props) => {
    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            <h2 className='space-y-2 text-lg font-bold'>{props.name}</h2>
            <a href={props.link} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={icon(props.icon)} alt={props.name} width={50} height={50}/>
            </a>
        </div>
    )
}