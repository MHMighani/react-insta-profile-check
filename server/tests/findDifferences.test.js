const getUsersInfoChangeList = require('../src/getUsersInfoChangeList.js')

test('test change object for normal change in public info',() => {
    const differenceObject = {
        profile_id: oldInfo.profile_id,
        username: oldInfo.username,
        profile_pic_url: oldInfo.profile_pic_url,
        changes:[
            {
                parameterChanged: 'biography',
                changeText: 'biography',
                newValue: 'new biography',
                oldValue: 'old biography'
            },
            {
                parameterChanged: "full_name",
                changeText: 'full name',
                newValue: newInfo.full_name,
                oldValue: oldInfo.full_name,
            },
            {
                parameterChanged: 'external_url',
                changeText: 'website link',
                newValue: 'new external_url',
                oldValue: 'old external_url'
            },
            {
                parameterChanged: 'is_private',
                changeText: 'privacy',
                oldValue: oldInfo.is_private,
                newValue: newInfo.is_private,
            }
        ]
    }

    expect(getUsersInfoChangeList(oldInfo,newInfo)).toEqual(differenceObject)
})

test('activation status ==> recently activated account',() => {
    const differenceObject = {
        profile_id: deactivedOldUserInfo.profile_id,
        username: deactivedOldUserInfo.username,
        profile_pic_url: deactivedOldUserInfo.profile_pic_url,
        changes:[
            {
                parameterChanged: 'is_active',
                changeText: 'activation',
                oldValue: deactivedOldUserInfo.is_active,
                newValue: newInfo.is_active,
            }
        ]
    }
    expect(getUsersInfoChangeList(deactivedOldUserInfo,newInfo)).toEqual(differenceObject)
})

test('activation status ==> recently deactivated account',() => {
    const differenceObject = {
        profile_id: newInfo.profile_id,
        username: newInfo.username,
        profile_pic_url: newInfo.profile_pic_url,
        changes:[
            {
                parameterChanged: 'is_active',
                changeText: 'activation',
                oldValue: newInfo.is_active,
                newValue: deactivedNewUserInfo.is_active,
            }
        ]
    }
    expect(getUsersInfoChangeList(newInfo,deactivedNewUserInfo)).toEqual(differenceObject)
})

test('no difference in public info of the user ',() => {
    expect(getUsersInfoChangeList(newInfo,newInfo)).toEqual([])
})

oldInfo = {
    profile_id:12345,
    username:'username',
    full_name:'old user',
    is_private: 1,
    profile_pic_url:'old url',
    biography: 'old biography',
    external_url: 'old external_url',
    is_active: '1'
}

newInfo = {
    profile_id:12345,
    username:'username',
    full_name:'new user',
    is_private: 0,
    profile_pic_url:'old url',
    biography: 'new biography',
    external_url: 'new external_url',
    is_active: '1'
}

deactivedOldUserInfo = {
    profile_id:12345,
    username:'username',
    full_name:'new user',
    is_private: 0,
    profile_pic_url:'old url',
    biography: 'new biography',
    external_url: 'new external_url',
    is_active: 0
}

deactivedNewUserInfo = {
    username: 'username',
    is_active: 0
}