import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, ImageSourcePropType, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { THEME } from "../../theme";
import { styles } from "./styles";

export interface GameCardProps {
    id: string;
    name: string;
    ads: string;
    cover: ImageSourcePropType;
}

type Props = TouchableOpacityProps & {
    data: GameCardProps
}

export function GameCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <ImageBackground
                source={data.cover}
                style={styles.cover}
            >

                <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
                    <Text style={styles.name}>
                        {data.name}
                    </Text>

                    <Text style={styles.ads}>
                        {data.ads}
                    </Text>

                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    )
}