import React from 'react'
import TableView from 'react-native-tableview'

const { Section, Item, Consts } = TableView

export const Home = (props) => {
    const { navigation: { navigate } } = props
    return (
        <>
            <TableView
                style={{ flex: 1 }}
                tableViewStyle={TableView.Consts.Style.Grouped}
                tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
            >
                <Section arrow>
                    <Item onPress={() => navigate('Edit', { editing: false })}>
                        Editing mode
                    </Item>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                    <Item>Item 4</Item>
                    <Item>Item 5</Item>
                </Section>
            </TableView>
        </>

    )
}