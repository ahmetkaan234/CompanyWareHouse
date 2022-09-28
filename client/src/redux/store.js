import {configureStore} from '@reduxjs/toolkit'
import WareHouseSlice from './WareHouseSlice/WareHouseSlice'

export const store = configureStore({
    reducer: {
        warehouse:WareHouseSlice
    }
})