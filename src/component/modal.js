import React, { useState } from 'react'
import ReactNativeModal from 'react-native-modal'
import { View, StyleSheet, Button, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'


export const EditModal = (props) => {
    const [value, setValue] = useState()
    const { visible, setVisible, list } = props

    const Delete = () => {
        setVisible(!visible)
    }

    const Hide = () => {
        setValue('')
    }

    const Submit = () => {
        setVisible(!visible)
        if (value) {
            list.push({ label: value, checked: false })
            AsyncStorage.setItem('list', JSON.stringify(list))
        }
    }

    return (
        <ReactNativeModal
            isVisible={visible}
            onBackdropPress={Delete}
            backdropOpacity={0.3}
            onModalHide={Hide}
        >
            <View style={styles.content}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        autoFocus
                        multiline
                        placeholder={'입력'}
                        style={styles.contentTitle}
                        value={value}
                        onChangeText={(value) => setValue(value)} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button onPress={Submit} title="확인" />
                </View>
            </View>
        </ReactNativeModal>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginHorizontal: 30
    },
    contentTitle: {
        flex: 1,
        fontSize: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
});
