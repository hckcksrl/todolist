import React, { useState, useEffect } from 'react'
import TableView from 'react-native-tableview'
import { View, Text } from 'react-native'
import { EditModal } from '../component/modal'
import AsyncStorage from '@react-native-community/async-storage'

const { Section, Item, Cell } = TableView

export const EditWrap = (props) => {
    const { list, setList, setDel } = props

    useEffect(() => {
        for (let item of list) {
            if (item.checked) {
                return setDel(true)
            }
        }
        setDel(false)
    }, [list])

    const checkedChange = (event) => {
        const { selectedIndex } = event
        let item = list[selectedIndex]
        if (item.checked) {
            item.checked = false
        } else {
            item.checked = true
        }
        setList(list => ([...list]));
        AsyncStorage.setItem('list', JSON.stringify(list))
    }

    const Change = (event) => {
        const { mode } = event
        if (mode == "move") {
            const { sourceIndex, destinationIndex } = event
            Swap(sourceIndex, destinationIndex)
        }
        else if (mode == "delete") {
            const { selectedIndex } = event
            list.splice(selectedIndex, 1)
            AsyncStorage.setItem('list', JSON.stringify(list))
        }
    }

    const Swap = (sourceIndex, destinationIndex) => {
        if (sourceIndex == destinationIndex) {
            setList(list)
        } else if (sourceIndex < destinationIndex) {
            let newList = []
            for (let i = 0; i < list.length; i++) {
                if (i == sourceIndex) {
                    continue
                } else if (i == destinationIndex) {
                    newList.push(list[i])
                    newList.push(list[sourceIndex])
                } else {
                    newList.push(list[i])
                }
            }
            AsyncStorage.setItem('list', JSON.stringify(newList))
            setList(newList)
        } else {
            let newList = []
            for (let i = 0; i < list.length; i++) {
                if (i == sourceIndex) {
                    continue
                } else if (i == destinationIndex) {
                    newList.push(list[sourceIndex])
                    newList.push(list[i])
                } else {
                    newList.push(list[i])
                }
            }
            AsyncStorage.setItem('list', JSON.stringify(newList))
            setList(newList)
        }
    }

    if (list) {
        return (
            <Edit {...props} list={list} setList={setList} checkedChange={checkedChange} Change={Change} />
        )
    }
    else {
        return null
    }
}

const Edit = (props) => {
    const { list, checkedChange, edit, Change } = props
    const [value, setValue] = useState()

    useEffect(() => {
    }, [list])

    return (
        <View style={{ flex: 1 }}>
            <TableView
                style={{ flex: 1 }}
                editing={edit}
                onChange={Change}
                reactModuleForCell="CustomItem"
            >
                <Section canMove canEdit>
                    {list.map((item, key) =>
                        <Item
                            key={key}
                            onPress={checkedChange}
                            label={item.label}
                            selected={item.checked ? true : false}
                        >
                            <Text>{item.label}</Text>
                        </Item>
                    )}
                </Section>
            </TableView>
            <EditModal value={value} setValue={setValue} />
        </View>
    )
}

