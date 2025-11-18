const sortData = (data, key, direction) => {
    const sortedData = [...data]; 

    sortedData.sort((a, b) => {
        let valA = a[key];
        let valB = b[key];

        if (typeof valA === 'string' && typeof valB === 'string') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }

        if (valA < valB) return direction === 'ascending' ? -1 : 1;
        if (valA > valB) return direction === 'ascending' ? 1 : -1;
        return 0;
    });

    return sortedData;
};

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return { ...state, items: action.payload }; 
        case 'LOGIN':
            return { ...state, isLoggedIn: true, userEmail: action.payload.userEmail };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, userEmail: null };
        

        case 'SORT_ITEMS':
            const { key, direction } = action.payload;
            return { 
                ...state, 
                items: sortData(state.items, key, direction)
            };
        case 'ADD_POST':
            const newPost = action.payload;

            return {
                ...state,
                items: [newPost, ...state.items]
            };
        
        case 'ADD_COMMENT':
            const { postId } = action.payload;
            
            const updatedItems = state.items.map(item => {
                if (item.postId === postId) {
                    return { ...item, commentsCount: item.commentsCount + 1 };
                }
                return item;
            });
            return { ...state, items: updatedItems };
        
        default:
            return state;
    }
};

export default AppReducer;