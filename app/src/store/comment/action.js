import { GET_COMMENTS, COMMENT_ADD } from '../actionTypes'
import { message } from 'antd';
import API from '@/services/index'

export function commentAdd(params) {
    return async (dispatch, getState) => {
        let res = await API.COMMENT_ADD(params)
        if (res) {
            let { status, response } = res
            if (status) {
                message.success('评论成功');
                let { name } = getState().user
                dispatch({
                    type: COMMENT_ADD, data: { ...response, replies: [], user: { name } }
                })
            }
        }
        return res
    }
}

export function getComments(params) {
    return async (dispatch) => {
        params.pageSize = 3;
        let res = await API.GET_COMMENTS(params)
        if (res) {
            let { status, response, pager } = res
            if (status) {
                dispatch({
                    type: GET_COMMENTS, data: { commentList: response, pager }
                })
            }
        }
        return res
    }
}
