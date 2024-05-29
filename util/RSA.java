/*
 * 
 * 暗号化はRSA.encrypt(message);
 * 複合はRSA.decrypt(message);で行う
 * 
 */

package util;

import java.util.ArrayList;
import java.util.List;

public class RSA {
	//P, Qを5桁以上で作ると桁あふれの可能性がある
	private static final long P = 4561L; //RSA.generateP(keta);
	private static final long Q = 5059L; //RSA.generateQ(keta);
	private static final long N = P * Q; 
	private static final long E = 7L; //RSA.generateE(P, Q);
	private static final long D = 13179703L;//RSA.generateD(P, Q, E);
	
	public static long generateP(int keta) {
		long p = 0;
		do {
			p = (long)(Math.random()*Math.pow(10, keta));
		}while(!isPrime(p));
		
		return p;
	}
	
	public static long generateQ(int keta) {
		long q = 0;
		do {
			q = (long) (Math.random()*Math.pow(10, keta));
		}while(!isPrime(q));
		
		return q;
	}
	
	public static long generateE(long P, long Q) {
		//return (P-1)*(Q-1)-1;
		
		long N = (P-1)*(Q-1);
		if(N % 2 != 0) {
			return 2;
		}
		
		List<Long> factList = factorizate(N);
		
		for(long i = 3; i < N; i+= 2) {
			List<Long> factList2 = factorizate(i);
			boolean flag = false;
			for(long f : factList) {
				for(long g : factList2) {
					if(f == g) {
						flag = true;
						break;
					}
				}
				
				if(flag)break;
			}
			
			if(flag == false) {
				return i;
			}
		}
		
		return -1;
	}
	
	public static List<Long> factorizate(long n) {
		List<Long> list = new ArrayList<>();
		if(n % 2 == 0) {
			list.add(2L);
			while(n % 2 == 0) {
				n /= 2;
			}
		}
		for(long i = 3; i <= n; i+=2) {
			for(long j = 0; n % i == 0; j++) {
				if(j == 0) list.add(i);
				n /= i;
			}
		}
		
		return list;
	}
	
	public static long encrypt(long message) throws Exception{
		if(N < message) {
			throw new Exception("message size is larger than P×Q!");
		}
		
		return powMod(message, E, N);
	}
	
	public static String encrypt(String message) {
		char[] arr = message.toCharArray();
		String res = "";
		for(char c : arr) {
			try {
				res += encrypt(c)+",";
			} catch (Exception e) {
				// TODO 自動生成された catch ブロック
				e.printStackTrace();
			}
		}
		
		return res;
	}
	
	public static long decrypt(long message) {
		return powMod(message, D, N);
	}
	
	public static String decrypt(String message) {
		String[] arr = message.split(",");
		String res = "";
		for(String s : arr) {
			res += (char)decrypt(Long.parseLong(s));
		}
		
		return res;
	}
	
	public static long powMod(long a, long b, long c) {
		long res = a;
		do {
			res %= c;
			--b;
			if(0 < b)res *= (a % c);
		}while(0 < b);
		
		return res;
	}
	
	public static long generateD(long P, long Q, long E) {
		long d = -1;
		for(long i = 1; d==-1; ++i) {
			d = culcD(P, Q, E, i);
		}
		return d;
	}
	
	private static long culcD(long P, long Q, long E, long n) {
		long expr = (P - 1) * (Q - 1) * n + 1;
		if( expr % E == 0) {
			return expr / E;
		}else return -1;
	}
	
	public static boolean isPrime(long n) {
		if(n <= 1)return false;
		if(n == 2)return true;
		if(n % 2 == 0)return false;
		for(int i = 3; i * i <= n; i+=2) {
			if(n % i == 0)return false;
		}
		
		return true;
	}
}
