import { ReactNode } from "react";
import { ImageBackground } from "react-native";
import { styles } from "./style";
import backgroundImg from "../../assets/background-galaxy.png";

interface Props {
    children: ReactNode;
}
export function Background({children}:Props) {
    return (
        <ImageBackground source={backgroundImg} style={styles.container} defaultSource={backgroundImg}>
            {children}
        </ImageBackground>
    )
}