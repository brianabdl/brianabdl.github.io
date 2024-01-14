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
        <div className="flex flex-col items-center">
            <a href={props.link} target="_blank" rel="noreferrer" className='space-y-2'>
                <h2 className='space-y-2 text-sm lg:text-lg font-bold'>{props.name}</h2>
                <FontAwesomeIcon icon={props.icon} size="3x" className={'w-8 lg:w-max'}/>
            </a>
        </div>
    )
}