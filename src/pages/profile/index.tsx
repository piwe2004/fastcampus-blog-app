import React from 'react'
import Profile from 'components/Profile'
import PostListPage from 'components/PostList'

export default function ProfilePage() {
    return (
        <>
            <Profile />
            <PostListPage hasNavigation={false} defaultTab='my' />
        </>
    )
}
