import {useContext} from "react";
import {AppContext} from "../../providers/AppProvider";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {GET_BY_OWNER, GET_TODOS} from "../../utils/endpoints";
import {ToDoResponse} from "../../types/dataTypes";

export function useGetToDos(): {status: "error" | "success" | "pending", todos: ToDoResponse, error: Error | null} {
    const {user} = useContext(AppContext)
    const { status, data, error} = useQuery({
        queryKey: ["todos", {user: user.id}],
        queryFn: async () => {
            const {data} = await axios.get(GET_BY_OWNER(user.id));
            return data;
        }
    });
    return {status, todos: data || {results:[],count:0,next:null,previous:null}, error}
}