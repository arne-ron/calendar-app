'use client'


import { TagBlock } from "@/app/ui/components/tag-block";


/**
 * Exposes an url for WIP and testing purposes
 *
 * @constructor
 */
export default function Page() {
    return (
        <div className='flex flex-col gap-2 p-2'>
            <TagBlock text='MyTag'/>
            <TagBlock text='or' />
            <TagBlock text='and'/>
            <TagBlock text='and'></TagBlock>
            <TagBlock text='or'>
                <TagBlock text='and'>
                    <p>mm</p>
                    <TagBlock text='Test2' color='bg-red-400' />
                </TagBlock>
                <TagBlock text='Test2' color='bg-gray-400' />
            </TagBlock>
            <TagBlock text='or' color='bg-gray-400'>
                <TagBlock text={'or'}>
                    <TagBlock text={'Y'} key='Y'/>
                </TagBlock>
            </TagBlock>

        </div>
    )
}