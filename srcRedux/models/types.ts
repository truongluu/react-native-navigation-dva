// =================
// REDUCERS
// =================
interface SubredditInfo {
    title: string;
}

type SubredditsState = {
    list: SubredditInfo[];
}


type ProductState = {
    counter: number;
};

type Action = {
    [field: string] : any
}