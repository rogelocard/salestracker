import {Tabs} from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Layout() {
    return(
        <Tabs>
            <Tabs.Screen 
                name='salesReport' 
                options={{title:"Reportes", headerShown:false, tabBarIcon: ({focus}) => 
                focus ? (
                    <FontAwesome6 name="book-open" size={24} color="black" />
                    ) : (
                        <FontAwesome6 name="book-open" size={24} color="gray" />
                        )
                    }}
            />
            <Tabs.Screen 
                name='registerSale' 
                options={{title:"Ventas", headerShown:false, tabBarIcon: ({focus}) => 
                focus ? (
                    <FontAwesome6 name="add" size={24} color="black" />
                    ) : (
                        <FontAwesome6 name="add" size={24} color="gray" />
                        )
                    }}
            />
            <Tabs.Screen 
                name='profile' 
                options={{title:"Perfil", headerShown:false, tabBarIcon: ({focus}) => 
                    focus ? (
                        <Feather name="eye" size={24} color="black" />
                    ) : (
                        <Feather name="eye" size={24} color="gray" />
                    )
                }}
            />
        </Tabs>
    )
}