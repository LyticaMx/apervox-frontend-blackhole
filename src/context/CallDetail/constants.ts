import { createAction } from 'types/contextReducer'
import {
  CallEmbeddingModel,
  LinkedTagModel,
  SegmentModel,
  SummaryCallDetailModel,
  TagModel
} from 'types/call'

export enum Types {
  SET_SUMMARY = 'callDetail/setSummary',
  SET_LINKED_TAGS = 'callDetail/setLinkedTags',
  SET_GENERAL_TAGS = 'callDetail/setGeneralTags',
  SET_EMBEDINGS = 'callDetail/setReceiverEmbeding',
  SET_SEGMENT_LIST = 'callDetail/setSegmentList',
  SET_TRANSMITTER_SIMILARITY = 'callDetail/setTransmitterSimilarity',
  SET_WORD_FREQUENCY = 'callDetail/getWordFrequency'
}

export const actions = {
  setGeneralTags: createAction<Types, TagModel[]>(Types.SET_GENERAL_TAGS),
  setSummary: createAction<Types, SummaryCallDetailModel>(Types.SET_SUMMARY),
  setLinkedTags: createAction<Types, LinkedTagModel>(Types.SET_LINKED_TAGS),
  setSegmentList: createAction<Types, TagModel[]>(Types.SET_SEGMENT_LIST),
  setEmbedings: createAction<Types, CallEmbeddingModel>(Types.SET_EMBEDINGS),
  setTransmitterSimilarity: createAction<Types, SegmentModel[]>(
    Types.SET_TRANSMITTER_SIMILARITY
  ),
  setWordFrequency: createAction<Types, TagModel[]>(Types.SET_WORD_FREQUENCY)
}
