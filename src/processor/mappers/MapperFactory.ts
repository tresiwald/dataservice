import {DataRequestProcessor} from "../processors/DataRequestProcessor";
import {TokenRequestProcessor} from "../processors/TokenRequestProcessor";
import {WriteRequestProcessor} from "../processors/WriteRequestProcessor";
import {DataResponseMapper} from "./DataResponseMapper";
import {TokenResponseMapper} from "./TokenResponseMapper";
import {WriteResponseMapper} from "./WriteResponseMapper";
export = MapperFactory

type Processor = DataRequestProcessor | TokenRequestProcessor | WriteRequestProcessor;
type Mapper = DataResponseMapper | TokenResponseMapper | WriteResponseMapper;

module MapperFactory{
    export const getMapperClass = (ProcessorImplementation: Processor): Mapper => {
        switch (getClassName(ProcessorImplementation)){
            case getClassName(TokenRequestProcessor):
                return TokenResponseMapper;
            case getClassName(DataRequestProcessor):
                return DataResponseMapper;
            case getClassName(WriteRequestProcessor):
                return WriteResponseMapper;
        }
    }

    const getClassName = (classType:any) => {
        return (new classType()).constructor.name

    }
}