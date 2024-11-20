import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Image } from 'react-native';

export default function Header() {
    const {user} = useUser();
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',    //--> burdaki özellkler ile profil fotosunun yerini ayarlamış olduk.
        justifyContent:'space-between',
        alignItems:'center'
    }}>
        <View>
            <Text style={{
                fontFamily:'outfit',
                fontSize:18
            }}
            >Welcome,</Text>

            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:25
            }}
            >{user?.fullName}</Text>
        </View>

        <Image source={{uri:user?.imageUrl}} 
        style={{
            height:40,
            width:40,
            borderRadius:99
        }}/>


    </View>
  )
}