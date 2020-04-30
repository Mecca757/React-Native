import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';//1.imported comments array from shared directory

//destructure
function RenderCampsite(props) {  

  const { campsite } = props;

  if (campsite) {
    return (
      <Card
        featuredTitle={campsite.name}
        image={require('./images/react-lake.jpg')}>
        <Text style={{ margin: 10 }}>
          {campsite.description}
        </Text>
        <Icon
          name={props.favorite ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          raised
          reverse
          onPress={() => props.favorite ?
            console.log('Already set as a favorite') : props.markFavorite()}
        />

      </Card>
    );
  }
  return <View />;
}

function RenderComments({ comments }) {

  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };
//5. in the render comments component used that array data for the flatlist
  return (
    <Card title='Comments'>
      <FlatList
        data={comments}
        renderItem={renderCommentItem} //6. this function took each comment in the array
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

//2. Brought comments array into local state (as this.state.comments)
class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      comments: COMMENTS,  
      favorite: false
    };
  }

  markFavorite() {
    this.setState({ favorite: true });
  }
  static navigationOptions = {
    title: `Campsite Information`
  }
//3. filtered out the comments only 3rd line
  render() {
    const campsiteId = this.props.navigation.getParam('campsiteId');
    const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
    const comments = this.state.comments.filter(comment => comment.campsiteId === campsiteId);
    return (//4. then passed that array into render comments 2nd line
      <ScrollView>
        <RenderCampsite campsite={campsite}
        favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
        <RenderComments comments={comments} />
      </ScrollView>
    );
  }
}

export default CampsiteInfo;
