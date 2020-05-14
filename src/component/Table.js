import React from 'react'
import { View, Text } from 'react-native';


class CustomItem extends React.Component {
    render() {
        var style = {};

        style.flex = 1;
        const selected = this.props.data.selected
        if (this.props.data.backgroundColor !== undefined) {
            style.backgroundColor = this.props.data.backgroundColor;
        }

        return (
            <View style={{
                marginLeft: 30,
                justifyContent: 'center',
                marginRight: selected ? 0 : 30, flex: 1
            }}>
                <Text style={{
                    fontSize: 20,
                    textDecorationLine: selected ? 'line-through' : 'none',
                    color: selected ? '#a0a0a0' : 'black'
                }}>
                    {this.props.data.label}
                </Text>
            </View>
        );
    }
}

export default CustomItem