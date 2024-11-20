import { Link, Redirect, useRootNavigationState } from "expo-router";
import { Pressable, Text, View } from "react-native";
import {useUser} from "@clerk/clerk-expo"
import { useEffect } from "react";

export default function Index() {

  const {user} = useUser();
  const RootNavigationState = useRootNavigationState()

  useEffect(()=>{
    CheckNavLoaded();
  },[] )

  const CheckNavLoaded=()=>{
    if(!RootNavigationState.key)
      return null;
  }

  return (
    <View
      style={{
        flex: 1
      }}
    >

      {user?
      <Redirect href={'/(tabs)/home'}/>
      :<Redirect href={'/login'} />}

    </View>
  );
}
