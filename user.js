let users = [];

exports.adduser = ({id , name ,room}) => {

    if(!name || ! room) return { err: "Name or Room is required"}

    const user = {id , name ,room}

    users.push(user);
     return {user};

}

exports.removeUser = (id) => {
    
  
    const index = users.findIndex((user) => user.id === id);
    return users[index];
  };

