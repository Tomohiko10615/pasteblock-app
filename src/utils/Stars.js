import { Image, StyleSheet } from "react-native";

export const getStars = (stars) => {
  let content = [];
  let currentStars = stars;
  for (let i = 0; i < 5; i++) {
    if (currentStars >= 0.75) {
      content.push(
        <Image
          style={styles.star}
          source={require("../../assets/star.png")}
          key={i}
        />
      );
    } else if (currentStars < 0.75 && currentStars >= 0.25) {
      content.push(
        <Image
          style={styles.star}
          source={require("../../assets/half-star.png")}
          key={i}
        />
      );
    } else {
      content.push(
        <Image
          style={styles.star}
          source={require("../../assets/no-star.png")}
          key={i}
        />
      );
    }
    currentStars--;
  }
  return content;
};

const styles = StyleSheet.create({
  star: {
    width: 25,
    height: 25,
  },
});
