const defaultSubtitle = `WEBVTT FILE

1
00:00:00.320 --> 00:00:02.320
docker a tool that can package software

2
00:00:02.320 --> 00:00:04.720
into containers that run reliably in any

3
00:00:04.720 --> 00:00:06.560
environment but what is a container and

4
00:00:06.560 --> 00:00:07.919
why do you need one let's imagine you

5
00:00:07.919 --> 00:00:09.440
built an app with cobalt that runs on

6
00:00:09.440 --> 00:00:11.120
some weird flavor of linux you want to

7
00:00:11.120 --> 00:00:12.480
share this app with your friend but he

8
00:00:12.480 --> 00:00:14.080
has an entirely different system so the

9
00:00:14.080 --> 00:00:15.759
problem becomes how do we replicate the

10
00:00:15.759 --> 00:00:17.520
environment our software needs on any

11
00:00:17.520 --> 00:00:19.039
machine one way to package an app is

12
00:00:19.039 --> 00:00:20.320
with a virtual machine where the

13
00:00:20.320 --> 00:00:22.000
hardware is simulated then installed

14
00:00:22.000 --> 00:00:24.160
with the required os and dependencies

15
00:00:24.160 --> 00:00:25.840
this allows us to run multiple apps on

16
00:00:25.840 --> 00:00:27.920
the same infrastructure however because

17
00:00:27.920 --> 00:00:28.640
each vm

18
00:00:28.640 --> 00:00:30.480
is running its own operating system they

19
00:00:30.480 --> 00:00:32.079
tend to be bulky and slow

20
00:00:32.079 --> 00:00:34.079
now a docker container is conceptually

21
00:00:34.079 --> 00:00:35.360
very similar to a vm

22
00:00:35.360 --> 00:00:36.960
with one key difference instead of

23
00:00:36.960 --> 00:00:38.879
virtualizing hardware containers only

24
00:00:38.879 --> 00:00:40.320
virtualize the os

25
00:00:40.320 --> 00:00:42.559
or in other words all apps or containers

26
00:00:42.559 --> 00:00:44.000
are run by a single kernel

27
00:00:44.000 --> 00:00:45.760
and this makes almost everything faster

28
00:00:45.760 --> 00:00:47.360
and more efficient there are three

29
00:00:47.360 --> 00:00:49.039
fundamental elements in the universe of

30
00:00:49.039 --> 00:00:49.680
docker

31
00:00:49.680 --> 00:00:51.840
the docker file the image and the

32
00:00:51.840 --> 00:00:54.480
container the docker file is like dna

33
00:00:54.480 --> 00:00:56.879
it's just code that tells docker how to

34
00:00:56.879 --> 00:00:58.640
build an image which itself is a

35
00:00:58.640 --> 00:01:00.079
snapshot of your software

36
00:01:00.079 --> 00:01:01.760
along with all of its dependencies down

37
00:01:01.760 --> 00:01:03.680
to the operating system level the image

38
00:01:03.680 --> 00:01:05.680
is immutable and it can be used to spin

39
00:01:05.680 --> 00:01:07.200
up multiple containers which is your

40
00:01:07.200 --> 00:01:08.799
actual software running in the real

41
00:01:08.799 --> 00:01:09.360
world

42
00:01:09.360 --> 00:01:11.360
create a docker file and use from to

43
00:01:11.360 --> 00:01:13.040
start from an existing template like

44
00:01:13.040 --> 00:01:15.119
ubuntu this base image gets pulled down

45
00:01:15.119 --> 00:01:15.840
from the cloud

46
00:01:15.840 --> 00:01:17.600
and you can also upload your own images

47
00:01:17.600 --> 00:01:19.040
to a variety of different docker

48
00:01:19.040 --> 00:01:19.759
registries

49
00:01:19.759 --> 00:01:21.439
from there you might want to use run to

50
00:01:21.439 --> 00:01:23.040
run a terminal command that installs

51
00:01:23.040 --> 00:01:24.400
dependencies into your image

52
00:01:24.400 --> 00:01:26.159
you can set environment variables and do

53
00:01:26.159 --> 00:01:27.680
all kinds of other stuff then the last

54
00:01:27.680 --> 00:01:29.360
thing you'll do is set a default command

55
00:01:29.360 --> 00:01:30.799
that's executed when you start up a

56
00:01:30.799 --> 00:01:31.439
container

57
00:01:31.439 --> 00:01:33.280
and now we can create the image file by

58
00:01:33.280 --> 00:01:34.880
running the docker build command

59
00:01:34.880 --> 00:01:36.320
it goes through each step in our docker

60
00:01:36.320 --> 00:01:38.640
file to build the image layer by layer

61
00:01:38.640 --> 00:01:40.400
we can then bring this image to life as

62
00:01:40.400 --> 00:01:42.560
a container with the docker run command

63
00:01:42.560 --> 00:01:44.320
as your app demands more resources you

64
00:01:44.320 --> 00:01:46.240
can run it on multiple machines multiple

65
00:01:46.240 --> 00:01:47.520
clouds on-prem

66
00:01:47.520 --> 00:01:49.600
or wherever you want reliably this has

67
00:01:49.600 --> 00:01:51.360
been docker in 100 seconds

68
00:01:51.360 --> 00:01:52.960
if you enjoyed it make sure to like and

69
00:01:52.960 --> 00:01:54.880
subscribe and stay tuned for more docker

70
00:01:54.880 --> 00:01:56.640
content coming to this channel soon

71
00:01:56.640 --> 00:01:58.399
thanks for watching and i will see you

72
00:01:58.399 --> 00:02:08.320
in the next one



`;

export default defaultSubtitle;
