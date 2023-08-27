const initialState = {
    preferredName: "Bob Jones",
    faculty: "Science",
    major: "Computer Science",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/800px-Twemoji_1f600.svg.png",
    contact: "bob.jones@gmail.com",
    aboutMe: `October arrived, spreading a damp chill over the grounds and into the castle. Madam Pomfrey, the nurse, was kept busy by a sudden spate of colds among the staff and students. Her Pepperup potion worked instantly, though it left the drinker smoking at the ears for several hours afterward. Ginny Weasley, who had been looking pale, was bullied into taking some by Percy. The steam pouring from under her vivid hair gave the impression that her whole head was on fire.
Raindrops the size of bullets thundered on the castle windows for days on end; the lake rose, the flower beds turned into muddy streams, and Hagrid's pumpkins swelled to the size of garden sheds. Oliver Wood's enthusiasm for regular training sessions, however, was not dampened, which was why Harry was to be found, late one stormy Saturday afternoon a few days before Halloween, returning to Gryffindor Tower, drenched to the skin and splattered with mud.`
    
};

const studentProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'editDetails': {
        return {...state, ...action.payload };
      }
      default:
        return state;
    }
  };


  export default studentProfileReducer;