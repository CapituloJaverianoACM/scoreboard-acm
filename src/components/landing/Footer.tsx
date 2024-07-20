import {ReactElement} from "react";
import {SocialIcon} from "react-social-icons";
const Footer = (): ReactElement => {
    return (
        <div className="sticky w-[100%] left-0 right-0 bottom-0">
            <div className="flex justify-between items-center p-10">
                <h1 className="text-xl">Capitulo Javeriano ACM</h1>
                <div>
                    <SocialIcon
                        network="github"
                        bgColor="black"
                        url="https://github.com/CapituloJaverianoACM"
                    />
                    <SocialIcon
                        network="instagram"
                        bgColor="black"
                        url="https://www.instagram.com/acmjaveriana/"
                    />
                    <SocialIcon
                        network="youtube"
                        bgColor="black"
                        url="https://www.youtube.com/@acmjaveriana2999"
                    />
                    <SocialIcon
                        network="tiktok"
                        bgColor="black"
                        url="https://www.tiktok.com/@acmjaveriana"
                    />
                </div>
            </div>
        </div>
    )
}


export default Footer;