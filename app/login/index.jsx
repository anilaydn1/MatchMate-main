//hızlı yapı oluşturmak için rnf yazılır

import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'react-native' //--> tag oluştururken çoook dikkatli ol
import Colors from './../../constants/Colors'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useCallback } from 'react'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {

  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])


  return (
    <View style={{
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <Image source={require('./../../assets/images/welcome_page_.jpg')}
      style={{
        width:'100%',
        height:500,
        borderRadius:8,
      }}
      />

      <View style={{
        padding:20,
        display:'flex',
        alignItems:'center'
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:30,
          textAlign:'center'
        }}>Unite, compete, and repeat! </Text>

        <Text style={{
          padding:5,
          fontSize:18,
          fontFamily:'outfit',
          textAlign:'center',
          color:Colors.GRAY
          
        }}
        >Let's find the perfect rival for your team and bring the excitement back to the game! </Text>

        <Pressable
        onPress={onPress}
        style={{
          padding:14,
          marginTop:21,
          backgroundColor:Colors.PRIMARY,
          width:'100%',
          borderRadius:14,

        }}
        >
          <Text style={{
            textAlign:'center',
            fontFamily:'outfit-medium',
            fontSize:20
          }}>Get Started</Text>
        </Pressable>

      </View>

    </View>
  )
}
