import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import axiosClient from '../api/axiosClient'

type User = {
	id: number
	userName: string
	role: 'USER' | 'ADMIN'
	fullName: string
}

type LoginResponse = {
	access_token: string
	refresh_token: string
	token_type: string
	expires_in: number
	user: User
}


type AuthContextType = {
	user: User | null
	accessToken: string | null
	isAuthenticated: boolean
	// login with response object; will set token and user
	login: (response: LoginResponse) => Promise<void>
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [accessToken, setAccessToken] = useState<string | null>(
		localStorage.getItem('accessToken'),
	)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		!!localStorage.getItem('accessToken'),
	)

	const fetchProfile = async () => {
		try {
			const res = await axiosClient.get(`/users/getUserByUserName?phone=${user?.userName}`)
			// map the response to User type
			const profileData = res.data
			setUser({
				id: profileData.id,
				userName: profileData.phoneNumber,
				role: profileData.role.name,
				fullName: profileData.fullName
			})
		} catch (err) {
			// failed to fetch profile (token invalid?) -> logout
			console.error('fetchProfile error', err)
			logout()
		}
	}

	useEffect(() => {
		// if we have a token on mount, try to load the user
		if (accessToken) {
			fetchProfile()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		// whenever accessToken changes, update isAuthenticated and fetch profile
		setIsAuthenticated(!!accessToken)
		if (accessToken) {
			fetchProfile()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accessToken])

	const login = async (response: LoginResponse) => {
		localStorage.setItem('accessToken', response.access_token)
		setAccessToken(response.access_token)
		setUser(response.user)
		setIsAuthenticated(true)
	}

	const logout = () => {
		setUser(null)
		setAccessToken(null)
		setIsAuthenticated(false)
		localStorage.removeItem('accessToken')
	}

	const value: AuthContextType = {
		user,
		accessToken,
		isAuthenticated,
		login,
		logout,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
}
