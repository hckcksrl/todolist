import React, { useState, useEffect } from 'react'
import TableView from 'react-native-tableview'
import { Button, FlatList, Text, View } from 'react-native'

const { Section, Item, Cell, Consts } = TableView

const example = [
    { label: "Text1", checked: false },
    { label: "Text2", checked: false },
    { label: "Text3", checked: true },
    { label: "Text4", checked: false },
]

export const EditWrap = (props) => {
    const [list, setList] = useState(example)


    const checkedChange = (event) => {
        const { selectedIndex } = event
        let item = list[selectedIndex]
        if (item.checked) {
            item.checked = false
        } else {
            item.checked = true
        }

        setList(list => ([...list]));
    }

    if (list) {
        return (
            <Edit {...props} list={list} setList={setList} checkedChange={checkedChange} />
        )
    }
    else {
        return null
    }
}

const Edit = (props) => {
    const { route, list, checkedChange } = props

    const Change = (event) => {
        const { mode } = event
        if (mode == "move") {
            const { sourceIndex, destinationIndex } = event
        }
        else if (mode == "delete") {
            const { selectedIndex, label } = event
        }
    }

    useEffect(() => {
        console.log(list)
    }, [list])

    return (
        <View style={{ flex: 1 }}>
            <TableView
                style={{ flex: 1 }}
                editing={route.params.editing}
                onChange={Change}
            >
                <Section canMove canEdit>
                    {list.map((item, key) =>
                        <Item
                            key={key}
                            label={item.label}
                            onPress={checkedChange}
                            selected={item.checked ? true : false}
                        ></Item>
                        // <Cell key={key} onPress={checkedChange}>
                        //     <View style={{ height: 50, justifyContent: 'center', paddingLeft: 50 }}>
                        //         <Text
                        //             style={{
                        //                 textDecorationLine: item.checked ? 'line-through' : 'none',
                        //                 textDecorationStyle: 'solid',
                        //                 fontSize: 20
                        //             }}>
                        //             {item.label}
                        //         </Text>
                        //     </View>
                        // </Cell>
                    )}
                </Section>
            </TableView>
        </View>
    )
}

