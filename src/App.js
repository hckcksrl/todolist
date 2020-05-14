import React, { useState, useEffect } from 'react';
import { EditWrap } from './screen/Home';
import { Header, Left, Right, Body, Container, Text, Title, Button, View, Icon } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { EditModal } from './component/modal';

const App = () => {
  const [edit, setEdit] = useState(false)
  const [visible, setVisible] = useState(false)
  const [list, setList] = useState()

  useEffect(() => {
    AsyncStorage.getAllKeys((err, data) => {
      if (data.length == 0) {
        AsyncStorage.setItem('list', JSON.stringify([]))
        setList([])
      } else {
        AsyncStorage.getItem('list').then((result) => {
          const data = JSON.parse(result)
          setList(data)
        })
      }
    })
  }, [])

  const _ChangeEdit = () => {
    if (edit) {
      setEdit(false)
    } else {
      setEdit(true)
    }
  }

  const _CheckDelete = () => {
    let newList = []
    for (let item of list) {
      if (!item.checked) {
        newList.push(item)
      }
    }
    setList(newList)
    AsyncStorage.setItem('list', JSON.stringify(newList))
  }

  return (
    <Container>
      <Header>
        <Left style={{ padding: 10 }}>
          <TouchableOpacity onPress={_ChangeEdit}>
            <Text style={{ fontWeight: '600' }}>{!edit ? "편집" : "완료"}</Text>
          </TouchableOpacity>
        </Left>
        <Body>
          <Title>TodoList</Title>
        </Body>
        <Right style={{ padding: 10 }}>
          <TouchableOpacity onPress={_CheckDelete}>
            <Text style={{ fontWeight: '600' }}>삭제</Text>
          </TouchableOpacity>
        </Right>
      </Header>
      <EditWrap edit={edit} list={list} setList={setList} />
      {!edit ? <Button style={styles.refreshButton} onPress={() => setVisible(!visible)}>
        <View style={[styles.refreshButtonView]}>
          <Icon name={'add'} type={'MaterialIcons'} style={styles.refreshIcon} />
        </View>
      </Button>
        : null}
      <EditModal visible={visible} setVisible={setVisible} list={list} setList={setList} />
    </Container>
  );
};

export default App;


const styles = StyleSheet.create({
  refreshButton: {
    shadowColor: '#4d4d4d', shadowOffset: { width: 1, height: 1, }, shadowOpacity: 0.3, shadowRadius: 4,
    backgroundColor: '#505050', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center',
    zIndex: 1, borderColor: '#a0a0a0', position: 'absolute', right: 50, bottom: 50
  },
  refreshButtonView: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  refreshIcon: { color: 'white', fontSize: 20 },
})