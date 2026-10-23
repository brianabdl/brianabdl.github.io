import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
        <div className="outline-card flex flex-col items-center space-y-3 p-4">
            <a href={props.link} target="_blank" rel="noreferrer" className='flex flex-col items-center space-y-2'>
                <FontAwesomeIcon icon={props.icon} size="2x" className='text-cyan-400'/>
                <h2 className='mono text-xs font-semibold text-gray-300'>{props.name}</h2>
            </a>
        </div>
    )
}