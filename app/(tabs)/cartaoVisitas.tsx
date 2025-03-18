import React from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import perfil from '../../assets/images/perfil.jpg';

export default function BusinessCard() {
  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Image source={perfil} style={styles.perfilImage} />

      <Text style={styles.name}>Luis Henrique Porto Menezes</Text>
      <Text style={styles.role}>Desenvolvedor Back-end</Text>
      <Text style={styles.techs}>Java | Spring Boot | C# </Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => openURL("https://github.com/luishmenezes")}>
         
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openURL("www.linkedin.com/in/luis-henrique-008a39246")}>
          
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openURL("mailto:luishpmenezes@hotmail.com")}>
          
        </TouchableOpacity>
      </View>

      <View style={styles.descContainer}>
        <Text style={styles.desc}>
          Sou um desenvolvedor back-end com forte conhecimento em java Spring Boot,{"\n"}
          criando aplicações escaláveis e performáticas. Possuo conhecimento também  em JavaScript{"\n"}
          e certa experiência com com React e Angular no front-end.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A020F0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  perfilImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  role: {
    fontSize: 16,
    color: "#ddd",
  },
  techs: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 15,
  },
  socialContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  descContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  desc: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
});