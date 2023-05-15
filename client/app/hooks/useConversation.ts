import {useParams } from 'next/navigation'
import {useMemo} from 'react'

const useConversation = () => {
    const params = useParams()

    const conversationId = useMemo(() => {
        if(!params?.conversationId) return ''

        return params.conversationId as string
    
    }, [params?.conversationId])

    const isOpen = useMemo(() => !!conversationId, [conversationId]);

    return useMemo(() => ({
        isOpen,
        conversationId
    }), [isOpen, conversationId])
}

export default useConversation;

//custom react hook

// This code defines a custom React hook called useConversation. The hook utilizes two other hooks: useParams and useMemo.

// The useParams hook is imported from the next/navigation module. It allows the hook to access the dynamic parameters of the current route.

// The useMemo hook is imported from the react module. It allows the hook to memoize values so that they are not recomputed unnecessarily.

// The useConversation hook returns an object that contains two properties: isOpen and conversationId.

// The isOpen property is a boolean that indicates whether the conversationId is truthy or not. If conversationId is truthy, then isOpen is true, otherwise, isOpen is false.

// The conversationId property is derived from the dynamic route parameter using useParams. If conversationId is undefined, the useMemo hook returns an empty string. Otherwise, it returns the value of conversationId as a string.

// Finally, the hook uses another useMemo call to memoize the object that it returns. This ensures that the object is only recomputed if its dependencies (isOpen and conversationId) have changed.