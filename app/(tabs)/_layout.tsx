import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import aleatorio from './NumAleatorio';
import cartao from './cartaoVisitas';


const Drawer = createDrawerNavigator();

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

export default function Layout() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#214cce" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#214cce",
      }}
    >
      <Drawer.Screen name="AT -> Número aleatório" component={aleatorio} />
      <Drawer.Screen name="AT -> Cartão de visitas" component={cartao} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});