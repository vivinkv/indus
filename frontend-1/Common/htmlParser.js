import parse from 'html-react-parser';

export const HTMLParse=(content)=>{
   const data = parse(typeof content === 'string'
        ? content
        : '');

        return data
}