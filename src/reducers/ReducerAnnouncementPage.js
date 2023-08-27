// Code inspired from Workshop 2's react-redux-button-counter-2022 repo: https://github.com/danyakarras/react-redux-button-counter-2022
const initialState = [
	{
		announcement: "Hey class! Remember to submit your CPSC 455 Workshop 2 Survey by 11:59 PM Wednesday.",
		announcementId: -1,
		announcementTitle: "Workshop 2 Survey Reminder"
	},
	{
		announcement: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare arcu dui vivamus arcu. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Id cursus metus aliquam eleifend mi. Commodo nulla facilisi nullam vehicula. Habitant morbi tristique senectus et netus. Mollis aliquam ut porttitor leo. Elementum nibh tellus molestie nunc. Tincidunt eget nullam non nisi est sit amet facilisis magna. Sed turpis tincidunt id aliquet risus. Sollicitudin ac orci phasellus egestas. Nisl suscipit adipiscing bibendum est. Nam aliquam sem et tortor consequat. Velit aliquet sagittis id consectetur purus. Massa vitae tortor condimentum lacinia quis vel eros. Turpis cursus in hac habitasse platea. Sed euismod nisi porta lorem mollis aliquam. Tincidunt vitae semper quis lectus nulla.",
		announcementId: -2,
		announcementTitle: "Announcement 2"
	}

]


const ReducerAnnouncementPage = (allAnnouncements = initialState, action) => {
	switch(action.type) {
        case 'ADD_ANNOUNCEMENT':
            return [...allAnnouncements, action.payload];
		case 'REMOVE_ANNOUNCEMENT' :
			return allAnnouncements.filter(
				(announcement) => announcement.announcementId !== action.payload
			  );
		default:
			return allAnnouncements;
	}
};


export default ReducerAnnouncementPage;