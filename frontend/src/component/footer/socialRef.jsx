import {
    FaFacebook, FaInstagram, FaXTwitter,
    FaLinkedin, FaGithub, FaYoutube, FaTiktok
} from 'react-icons/fa6';

const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook />, href: '#', hover: 'hover:text-blue-600' },
    { name: 'Instagram', icon: <FaInstagram />, href: '#', hover: 'hover:text-pink-500' },
    { name: 'X', icon: <FaXTwitter />, href: '#', hover: 'hover:text-black' },
    { name: 'YouTube', icon: <FaYoutube />, href: '#', hover: 'hover:text-red-600' },
    { name: 'TikTok', icon: <FaTiktok />, href: '#', hover: 'hover:text-red-800' },
];

export default function SocialRef() {
    return (
        <>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {socialLinks.map((social) => (
                    <a
                        key={social.name}
                        href={social.href}
                        className={`text-2xl text-black transition-all duration-300 hover:-translate-y-1 ${social.hover}`}
                        aria-label={social.name}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {social.icon}
                    </a>
                ))}
            </div>


        </>



    );
}
