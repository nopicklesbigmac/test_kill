package com.proj.instagram.user;

import java.util.Map;

public interface IUserService {

	Map<String, Object> joinProc(UserDTO user, Map<String, Object> result);


	boolean usercheck(UserDTO user);
 
}
